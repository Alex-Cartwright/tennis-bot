type BookingRequest = {
  date: Date
  location: string
}

export const requestBooking = (booking: BookingRequest) => {
  console.log('Booking requested', booking)
  //This should save the booking to the DB
}