type Location = {
  name: string
  url: string
  times: number[]
}

export const locations : Location[] = [
  {
    name: 'Islington',
    url: 'https://bookings.better.org.uk/location/islington-tennis-centre/tennis-court-outdoor/',
    times: [
      7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21
    ]
  },
  {
    name: 'Lea Valley',
    url: '',
    times: []
  }
]

// export const fetchLocations = () : string[] => {
//   return Object.keys(locations)
// }