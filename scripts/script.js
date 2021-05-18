$(document).ready(function () {
   let drawn = false
   let chosen = [];
   let number;
   let list = cardDetails;
   let filteredList = cardDetails;


   // fade in contents when page is loaded
   $('#wrapper').delay(1000).fadeIn(1000);

   // vanishes the selected card if one exists
   const hideCard = () => {
      if (drawn) {
         $('.selected').fadeOut('fast');
      }
   }

   ////////////////////// DRAW
   const drawCard = () => {
      var confirm = $('#confirm-input').val().trim().toLowerCase();

      $('#confirm-draw-modal').modal('hide'); // hide the modal
      hideCard(); // fades away existing card
      $('.overlay').delay(500).fadeIn();

      if (confirm === 'yes') {
         if (chosen.length === list.length) { //show depleted if deck is empty
            setTimeout(function () {
               depleted();
            }, 500)
         } else {
            $('#loader').delay(500).fadeIn(300);
            setTimeout(function () {
               $('#loader').fadeOut(300);
               roll();
            }, 5000) // length of time Loader is present

            drawn = true
         }
      }
   }


   ////////////////////// ROLL
   const roll = () => {
      number = Math.floor(Math.random() * list.length);

      if (!chosen.includes(number)) {
         createCard();
      } else {
         roll();
      }
   }

   ////////////////////// CREATE CARD
   const createCard = () => {
      const num = number;
      const str1 = "images/deck/"
      const img = list[num].image.substring(list[num].image.lastIndexOf('/') + 1);
      const title = list[num].title;
      const source = str1.concat(title.toLocaleLowerCase() + '.png');

      $('.card-img').attr('src', source).attr('alt', title).css('display', 'block');

      setTimeout(function () {
         $('.selected').fadeIn(3000) // length of time for card to fade in 
      }, 1000)

      chosen.push(num);
      $('#expended #exp-cards').prepend(
         `<div class='frame'>
                              <img src='${source}' alt='${title}'>
                           </div>`
      )
      $('#expended #exp-cards .frame:first-child').delay(1000).fadeIn(5000);
      showExpended();
   }


   ////////////////////// DECK DEPLETED
   const depleted = () => {
      $('.card-img').hide();
      $('#card-title').text('Deck depleted');

      setTimeout(function () {
         $('.selected').fadeIn(400)
      }, 500)
   }

   ////////////////////// SHUFFLE
   const shuffleDeck = () => {
      let num;
      $('.cards .frame').each(function (index) {
         num = index + 1
         $(this).addClass('shuffle-' + num)
      })
      setTimeout(function () {
         $('.cards .frame').each(function (index) {
            num = index + 1
            $(this).removeClass('shuffle-' + num);
         })
      }, 5000)
   }


   ////////////////////// DECK BUILDER
   const validateChecked = () => {
      let valid = false;
      $('.card-checkbox input').each(function () {
         if ($(this).is(':checked')) {
            valid = true;
            return false;
         }
      })
      return valid;
   }

   const boxChecked = () => {
      if (validateChecked()) {
         $('#build-confirm-btn').attr('disabled', false)
         $('#builder-danger').css('display', 'none')
      } else {
         $('#build-confirm-btn').attr('disabled', true)
         $('#builder-danger').css('display', 'block')
      }
   }


   $('#basic13-btn').on('click', function () {
      $('.card-checkbox input').each(function (index, element) {
         $(this).prop('checked', false);
      })
      for (var i = 1; i <= 13; i++) {
         (function (ind) {
            setTimeout(function () {
               $('#card' + ind + '-chk').prop('checked', true);
               boxChecked();
            }, 30 * ind);
         })(i);
      }
   })

   $('#selectall-btn').on('click', function () {
      for (var i = 1; i <= 22; i++) {
         (function (ind) {
            setTimeout(function () {
               $('#card' + ind + '-chk').prop('checked', true);
               boxChecked();
            }, 30 * ind);
         })(i);
      }
   })

   $('#deselectall-btn').on('click', function () {
      for (var i = 22; i >= 1; i--) {
         (function (ind) {
            setTimeout(function () {
               $('#card' + ind + '-chk').prop('checked', false);
               boxChecked();
            }, 30 * ind);
         })(i);
      }
   })

   $('.card-checkbox input').change(boxChecked);

   $('#build-confirm-btn').on('click', function () {
      list = cardDetails;
      let deleteList = []

      $('.card-checkbox').each(function (index, element) {
         if (!$(this).find('input').prop('checked')) {
            deleteList.push(index);
         }
      })

      filteredList = list.filter(function (value, index, arr) {
         return !deleteList.includes(index);
      })

      list = filteredList;

      $('#build-deck-modal').modal('hide');
      hideCard();
      $('#exp-cards .frame').fadeOut();
      $('#exp-cards').empty();
      chosen = [];
      showExpended();
   })


   ////////////////////// CONFIRM RESET
   const confirmReset = () => {
      chosen = [];
      list = filteredList;
      $('#reset-modal').modal('hide');
      hideCard();
      $('#expended #exp-cards .frame').remove();
      $('#card-title').text('');
      showExpended();
      $('#snackbar').addClass('show');
      // After 4 seconds, vanish the snackbar
      setTimeout(function () {
         $('#snackbar').removeClass('show');
      }, 4000);
   }


   ////////////////////// EXPENDED
   const showExpended = () => {
      if (chosen.length > 0) {
         $('#expended').fadeIn();
      } else {
         $('#expended').fadeOut().removeClass('shift');

      }
   }


   ////////////////////// TRIGGERS
   $('#confirm-draw').submit(function (e) {
      e.preventDefault();
      drawCard();
      $('#confirm-input').val('');
   });

   $('#form-submit-btn').click(function (e) {
      e.preventDefault();
      drawCard();
      $('#confirm-input').val('');
   });

   $('.draw-btn').on('click', function () {
      $('#confirm-draw-modal').modal('show')
   })

   $('.deck-card').on('click', function () {
      $('#confirm-draw-modal').modal('show');
   });

   $('.build-btn').on('click', function () {
      $('#build-deck-modal').modal('show');
   });

   $('.reset-btn').on('click', function () {
      $('#reset-modal').modal('show');
   })

   $('#modal-reset-btn').on('click', confirmReset);

   $('.shuffle-btn').on('click', shuffleDeck);

   $('#exp-drawer-btn').on('click', function () {
      $('#expended').toggleClass('shift');
   })

   $('.overlay .fa-close').on('click', function () {
      $('.overlay').fadeOut();
   })


})
