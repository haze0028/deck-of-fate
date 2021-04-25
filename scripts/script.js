$(document).ready(function () {
   let drawn = false
   let chosen = [];
   let number;
   let list = cardDetails;
   let filteredList = cardDetails;


   // fade in contents when page is loaded
   $('#wrapper').delay(1000).fadeIn(2000);

   // vanishes the selected card if one exists
   const hideCard = () => {
      if (drawn) {
         $('.selected').fadeOut();
      }
   }

   ////////////////////// DRAW
   const drawCard = () => {
      var confirm = $('#confirm-input').val().trim().toLowerCase();

      $('#confirm-draw-modal').modal('hide'); // hide the modal
      hideCard(); // fades away existing card

      if (confirm === 'yes') {
         if (chosen.length === list.length) {
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

      $('#card-img').attr('src', source).attr('alt', title).css('display', 'block');

      setTimeout(function () {
         $('.selected').fadeIn(3000) // length of time for card to fade in 
      }, 1000)

      chosen.push(num);
      $('#expended #exp-cards').append(
         `<div class='frame col-md-2 col-6'>
                              <img src='${source}' alt='${title}'>
                           </div>`
      )
      $('#expended #exp-cards .frame:last-child').delay(1000).fadeIn(6000);
   }


   ////////////////////// DECK DEPLETED
   const depleted = () => {
      $('#card-img').hide();
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


   ////////////////////// CARD SELECTOR
   $('#basic13-btn').on('click', function () {
      $('.card-checkbox input').each(function (index, element) {
         $(this).prop('checked', false);
      })
      for (var i = 1; i <= 13; i++) {
         (function (ind) {
            setTimeout(function () {
               $('#card' + ind + '-chk').prop('checked', true);
            }, 30 * ind);
         })(i);
      }
   })

   $('#selectall-btn').on('click', function () {
      for (var i = 1; i <= 22; i++) {
         (function (ind) {
            setTimeout(function () {
               $('#card' + ind + '-chk').prop('checked', true);
            }, 30 * ind);
         })(i);
      }
   })

   $('#deselectall-btn').on('click', function () {
      for (var i = 22; i >= 1; i--) {
         (function (ind) {
            setTimeout(function () {
               $('#card' + ind + '-chk').prop('checked', false);
            }, 30 * ind);
         })(i);
      }
   })

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
      $('#expended #exp-cards .frame').fadeOut();
   })


   ////////////////////// CONFIRM RESET
   const confirmReset = () => {
      chosen = [];
      list = filteredList;
      $('#reset-modal').modal('hide');
      hideCard();
      $('#expended #exp-cards .frame').remove();
      $('#card-title').text('');
      $('#snackbar').addClass('show');
      // After 4 seconds, vanish the snackbar
      setTimeout(function () {
         $('#snackbar').removeClass('show');
      }, 4000);
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

   $('#draw-btn').on('click', function () {
      $('#confirm-draw-modal').modal('show')
   })

   $('.deck-card').on('click', function () {
      $('#confirm-draw-modal').modal('show');
   });

   $('#build-btn').on('click', function () {
      $('#build-deck-modal').modal('show');
   });

   $('#reset-btn').on('click', function () {
      $('#reset-modal').modal('show');
   })

   $('#modal-reset-btn').on('click', confirmReset);

   $('#shuffle-btn').on('click', shuffleDeck);




})
