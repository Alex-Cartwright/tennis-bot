export type Location = {
  name: string
  url: string
}

const locations = [
  {
    name: 'Islington',
    url: '',
    times: []
  },
  {
    name: 'Lea Valley',
    url: '',
    times: []
  }
]

export const fetchLocations = () : Location[] => {
  return locations
}