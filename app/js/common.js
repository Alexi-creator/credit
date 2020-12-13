"use strict"

document.addEventListener('DOMContentLoaded', function() {

  let btnSelect = document.querySelector('.btn-select'),
  selectInput = document.querySelectorAll('.item-select__input')

  btnSelect.addEventListener('click', () => {
  selectInput.forEach(item => item.classList.add('req'))
  })

    
  let select = function () {
  let selectHeader = document.querySelectorAll('.select-product__header');
  let selectItem = document.querySelectorAll('.select-product__item');

  selectHeader.forEach(item => {
      item.addEventListener('click', selectToggle)
  });

  selectItem.forEach(item => {
      item.addEventListener('click', selectChoose)
  });

  function selectToggle() {
      this.parentElement.classList.toggle('is-active');
  }

  function selectChoose() {
      let text = this.innerText,
      select = this.closest('.select-product'),
      currentText = select.querySelector('.select-product__current');
      currentText.innerText = text;
      select.classList.remove('is-active');

  }

  };


  select();

})










