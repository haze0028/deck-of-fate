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
   resetCard();

   if (confirmDraw() === 'yes') {
      $('#loader').fadeIn(300);

      setTimeout(function () {
         $('#loader').fadeOut(300);
         roll();
      }, 5000) // length of time Loader is present

      drawn = true
   }
}

const confirmDraw = () => {
   var confirm = prompt('ARE YOU SURE!? Type "yes" to draw...')
   if (confirm) {
      return confirm.trim().toLowerCase();
   }
}

$('.deck-card').on('click', drawCard);

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
   console.log(num);
}

const depleted = () => {
   $('#card-title').text('Deck depleted');

   setTimeout(function () {
      $('.selected').fadeIn(400)
   }, 1000)
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
