//import data from "/json";

const EVENTFUL_SEARCH_URL ='https://api.eventful.com/json/events/search';
//console.log(data);
function getDataFromApi(searchTermOne, searchTermTwo, searchTermThree, startDate, endDate, callback) {
  const query = {
    location:searchTermOne,
    keywords:searchTermTwo,
    start_date: startDate, //moment().format('YYYYMMDD00'),
    end_date: endDate, //moment().format('YYYYMMDD00')
    within:searchTermThree,
    units:'mi',

    app_key:'FJjthswGhP26qMXR'
    }
  $.getJSON(EVENTFUL_SEARCH_URL, query, callback).fail(function(){
    console.log("error");
    
  })
  
}
//console.log("hi");
function renderResult(result) {
  console.log(result);
  //var vId=console.log(result.id.videoId);
  //var vId=result.id.videoId;
  //console.log(vId);
  console.log(result.title);
  //console.log(totalResults);
  return `
    <div>
      <h2>${result.title}</h2> <form id="rating" class="js-search-form">
            <label id="rating-label">Rate me: 
        <input type="hidden" name="rat" class="rat-value" value="0"/></label>
              
              <div id="rateYo"></div>
                <script>$("#rateYo").rateYo({
               starWidth: "40px"
                });</script>
              
          </form>
      <h2>${result.city_name}</h2>
      <p>Check out ${result.title}'s video!</p>  
      <a class="js-result-name" href="result.url" target="_blank"> <img src="${result.image.medium.url}" alt= "${result.title}'s video"</a> 
   
    </div>
  `;
}
//console.log("a");
function displayEventfulSearchData(data) {
  //console.log("hello");
  //console.log(data.events.event[1].title);
  //console.log(data.items[1].id.videoId);
 // let movieTitle = data.items[0].snippet.title;
  //let results = []
  //for(let i =0; i < data.items.length; i++) {
    // results.push(renderResult(data.items[i]));
  //}
     //const results = data.items.map( function (item, index) { 
     //return renderResult(item)
   //});
   
 const results = data.events.event.map((item, index) => renderResult(item));
 // console.log(data);
  //$('.js-search-results').prepend(`<h4>About ${data.pageInfo.totalResults} results </h4>`);
  $('.js-search-results').html(`About ${data.total_items} results` + results);
}
//console.log("b");
function watchSubmit() {
  //console.log("d");
  $('.js-search-form').submit(event => {
    //console.log("e");
    event.preventDefault();

    // const queryTarget = $(event.currentTarget).find('.js-query');
    // const searchTerm = queryTarget.val();
    // console.log("a");
    // const queryTargetOne = $(event.currentTarget).find('.js-query');
    // console.log("b");
    // const searchTermTwo=queryTargetOne.val();
    // // clear out the input
    // queryTarget.val("");
    // queryTargetOne.val("");
    //console.log("c");
    const searchTermOne = $("#location").val();
    const searchTermTwo = $("#keyword").val();
    const startDate = $("#start-date").val();
    const endDate = $("#end-date").val();
    const searchTermThree = $("#miles").val();

    console.log(searchTermOne,searchTermTwo, searchTermThree);

    getDataFromApi(searchTermOne, searchTermTwo, searchTermThree, startDate, endDate, displayEventfulSearchData);
  });
}

$(watchSubmit);
