function search_icon(inp) {
  var iTag = document.createElement('i');
  iTag.classList.add('fa', 'fa-search', 'searchButton');
  document.querySelector(`.search_box-${inp}`).parentNode.appendChild(iTag)
}


// function initialise_time_picker() {
//   let hourPicker = document.querySelector('.hour_picker');
//   let minutesPicker = document.querySelector('.minutes_picker');
//   let meridiemPicker = document.querySelector('.meridiem_picker')
//   let minutes = ['00', '15', '30', '45']
//   let meridiem = ['AM', 'PM']
//   for (let i = 1; i <= 12; i++) {
//     let option = `<option value=${i}>${i}</option>`;
//     hourPicker.innerHTML += option;
//   }

//   minutes.forEach(min => {
//     let option = `<option value=${min}>${min}</option>`;
//     minutesPicker.innerHTML += option;
//   })

//   meridiem.forEach(mer => {
//     let option = `<option value=${mer}>${mer}</option>`;
//     meridiemPicker.innerHTML += option;
//   })


// }
// initialise_time_picker()

window.addEventListener('load', () => {
  const panel = document.querySelector('.plan_side_menu');
  panel.classList.add('open');

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); // This will return a number from 0 to 11, where 0 is January and 11 is December
  const currentDateOfMonth = currentDate.getDate();
  const formattedDate = `${currentYear}-${currentMonth + 1}-${currentDateOfMonth}`; // This will return a string in the format "YYYY-MM-DD"

  document.getElementById('calendar-selectrange').value = formattedDate;

  const currentTime = new Date();
  let hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const roundedMinutes = 15 * Math.round(minutes / 15);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours %= 12;
  hours = hours || 12;
  const formattedTime = `${hours}:${roundedMinutes < 10 ? '00': roundedMinutes} ${ampm}`;
  document.querySelector('.hour_picker').value = hours;
  document.querySelector('.minutes_picker').value = roundedMinutes < 10 ? '00' : roundedMinutes;
  document.querySelector('.meridiem_picker').value = ampm;

});

function goBack() {
  window.location.href = '/'
}
flatpickr('#calendar-selectrange', {
  "minDate": new Date().fp_incr(0),
  "maxDate": new Date().fp_incr(4)
});