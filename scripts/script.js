////////////////////// DRAW
let drawn = false
let chosen = [];
let number;

const resetCard = () => {
   if (drawn) {
      $('.selected').fadeOut()
   }
}

const drawCard = () => {
   var confirm = $('#confirm-input').val().trim().toLowerCase();

   $('#confirm-draw-modal').modal('hide'); // hide the modal
   resetCard(); // fades away existing card

   if (confirm === 'yes') {
      $('#loader').delay(500).fadeIn(300);

      setTimeout(function () {
         $('#loader').fadeOut(300);
         roll();
      }, 5000) // length of time Loader is present

      drawn = true
   }
}

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
   $('#confirm-input').delay(1000).focus();
})

$('.deck-card').on('click', function () {
   $('#confirm-draw-modal').modal('show');
   $('#confirm-input').delay(1000).focus();
});

const roll = () => {
   number = Math.floor(Math.random() * 22);

   if (!chosen.includes(number)) {
      createCard();
   } else if (chosen.length === 22) {
      depleted();
   } else {
      roll();
   }
}

const createCard = () => {
   const num = number;
   const str1 = "images/deck/"
   const img = cardDetails[num].image.substring(cardDetails[num].image.lastIndexOf('/') + 1);
   const title = cardDetails[num].title;

   $('#card-img').attr('src', str1.concat(img)).attr('alt', title);
   $('#card-title').text(title);

   setTimeout(function () {
      $('.selected').fadeIn(3000) // length of time for card to fade in 
   }, 1000)

   chosen.push(num);
}

const depleted = () => {
   $('#card-title').text('Deck depleted');

   setTimeout(function () {
      $('.selected').fadeIn(400)
   }, 1000)
}


////////////////////// RESET DECK
const resetDeck = () => {
   chosen = [];
}


////////////////////// SHUFFLE
const shuffleDeck = () => {
   let num;
   $('#deck img').each(function (index) {
      num = index + 1
      $('#card' + num).addClass('spin-' + num)
   })
   setTimeout(function () {
      $('#deck img').each(function (index) {
         num = index + 1
         $('#card' + num).removeClass('spin-' + num);
      })
   }, 1000)

}
