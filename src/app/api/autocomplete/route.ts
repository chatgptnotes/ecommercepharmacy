import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')

    if (!query || query.trim().length < 2) {
      return NextResponse.json({
        suggestions: [],
      })
    }

    const searchTerm = query.trim()

    // Search medicines
    const { data: medicines } = await supabase
      .from('medicines')
      .select('id, name, manufacturer, category')
      .or(`name.ilike.%${searchTerm}%,manufacturer.ilike.%${searchTerm}%,category.ilike.%${searchTerm}%`)
      .eq('available', true)
      .order('orderCount', { ascending: false })
      .limit(8)

    // Search pharmacies
    const { data: pharmacies } = await supabase
      .from('pharmacies')
      .select('id, businessName, address')
      .ilike('businessName', `%${searchTerm}%`)
      .eq('status', 'APPROVED')
      .order('rating', { ascending: false })
      .limit(5)

    // Format results
    const suggestions = [
      ...(medicines || []).map((med: any) => ({
        id: med.id,
        name: med.name,
        type: 'medicine' as const,
        subtitle: `${med.manufacturer} • ${med.category}`,
        category: med.category,
      })),
      ...(pharmacies || []).map((pharm: any) => ({
        id: pharm.id,
        name: pharm.businessName,
        type: 'pharmacy' as const,
        subtitle: pharm.address,
      })),
    ]

    return NextResponse.json({
      suggestions,
      total: suggestions.length,
    })
  } catch (error) {
    console.error('Autocomplete API error:', error)
    // Return empty suggestions on error (component will use mock data)
    return NextResponse.json(
      {
        suggestions: [],
      },
      { status: 200 }
    )
  }
}
