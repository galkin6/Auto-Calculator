$(document).ready(function () {

 var imgHolder = $('#imgHolder img');
 var srcValue = $("#imgHolder img").attr('src');


 // выбираем цвет
 $('.colorItem').on('click', function () {

  var imgPath = $(this).attr('data-img-path');

  $(imgHolder).fadeOut(200, function () {
   $(imgHolder).attr('src', imgPath).fadeIn(200);
  });


 });

 var modelSpecs,
  modelPrice,
  modelSpecsHolder,
  modelPriceHolder,
  modelPriceUSD;

 modelSpecsHolder = $('#modelSpecsHolder');
 modelPriceHolder = $('#modelPriceHolder');
 modelPriceUSDHolder = $('#modelPriceUSDHolder');


 // вызываем функции при изменении инпут
 $('#header__options').on('change', function () {
  calculatePrice();
  compileSpecs();
 });

 calculatePrice();
 compileSpecs();

// формирование цены
 function calculatePrice() {
  var modelPriceEngine = $('input[name=engine]:checked', '#header__options').val();
  var modelPriceTransmission = $('input[name=transmission]:checked', '#header__options').val();
  var modelPriceAddOptions = $('input[name=addOptions]:checked', '#header__options').val();
  modelPriceEngine = parseInt(modelPriceEngine);
  modelPriceTransmission = parseInt(modelPriceTransmission);
  modelPriceAddOptions = parseInt(modelPriceAddOptions);

  modelPrice = modelPriceEngine + modelPriceTransmission + modelPriceAddOptions;

  modelPriceHolder.text('₽ ' + modelPrice);
 }

// Выбор спецификации
 function compileSpecs() {
  modelSpecs = $('input[name=engine]:checked + label', '#header__options').text();
  modelSpecs = modelSpecs + $('input[name=transmission]:checked + label', '#header__options').text();
  modelSpecs = modelSpecs + $('input[name=addOptions]:checked + label', '#header__options').text();

  modelSpecsHolder.text(modelSpecs);
 };

 // получаем доллары

 $.getJSON("https://www.cbr-xml-daily.ru/daily_json.js", function (data) {

  $('#modelPriceUSD').html(data.Valute.USD.Value);
  var usdRate = data.Valute.USD.Value;

  function convertUSD() {

   modelPriceUSD = modelPrice / usdRate;
   modelPriceUSDHolder.text('$ ' + modelPriceUSD.toFixed(0));
  }
  $('#header__options').on('change', function () {
   convertUSD();
  });
  convertUSD();
 });

  $('.header__menu-icon').on('click', function(){
   $(this).toggleClass('header__menu-icon-rotate');
   $('.header__vesta').toggleClass('active-calculator');
   
  });

});
