"use strict"

document.addEventListener('DOMContentLoaded', function() {

  let btnForm = document.querySelector('.applications__btn-form'),
      Input = document.querySelectorAll('.applications__input-wrap')

  btnForm.addEventListener('click', () => {
  Input.forEach(item => item.classList.add('reqApp'))
  })


})