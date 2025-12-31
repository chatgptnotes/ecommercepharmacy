import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')
    const type = searchParams.get('type') as 'medicine' | 'pharmacy' | null
    const lat = searchParams.get('lat')
    const lon = searchParams.get('lon')

    if (!query || query.trim().length < 2) {
      return NextResponse.json(
        { error: 'Search query must be at least 2 characters' },
        { status: 400 }
      )
    }

    const userLocation = lat && lon ? { lat: parseFloat(lat), lon: parseFloat(lon) } : null

    // Search medicines across all pharmacies
    if (type === 'medicine' || !type) {
      const medicines = await prisma.medicine.findMany({
        where: {
          name: { contains: query, mode: 'insensitive' },
          available: true,
          pharmacy: { status: 'APPROVED' },
        },
        include: {
          pharmacy: {
            select: {
              id: true,
              businessName: true,
              rating: true,
              address: true,
              latitude: true,
              longitude: true,
            },
          },
        },
        take: 50,
        orderBy: [
          { orderCount: 'desc' }, // Popular first
          { price: 'asc' },        // Then by price
        ],
      })

      return NextResponse.json({
        type: 'medicine',
        results: medicines,
        total: medicines.length,
      })
    }

    // Search pharmacies
    if (type === 'pharmacy') {
      const pharmacies = await prisma.pharmacy.findMany({
        where: {
          businessName: { contains: query, mode: 'insensitive' },
          status: 'APPROVED',
        },
        select: {
          id: true,
          businessName: true,
          address: true,
          latitude: true,
          longitude: true,
          rating: true,
          totalReviews: true,
          totalOrders: true,
          deliveryRadius: true,
        },
        take: 20,
        orderBy: [
          { rating: 'desc' },
          { totalOrders: 'desc' },
        ],
      })

      return NextResponse.json({
        type: 'pharmacy',
        results: pharmacies,
        total: pharmacies.length,
      })
    }

    return NextResponse.json({ error: 'Invalid search type' }, { status: 400 })
  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
