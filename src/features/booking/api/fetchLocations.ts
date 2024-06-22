export type Location = {
  name: string
  url: string
}

const locations = [
  {
    name: 'Islington',
    url: ''
  },
  {
    name: 'Lea Valley',
    url: ''
  }
]

export const fetchLocations = () : Location[] => {
  return locations
}