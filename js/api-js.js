//classes
//hoofddiv = gss-results
//zoekbox = gss-search-box-container
//resultaten = gss-search-results

//voorbereiden haal variabelen uit url
      var getUrlParameter = function getUrlParameter(sParam) {
          var sPageURL = decodeURIComponent(window.location.search.substring(1)),
              sURLVariables = sPageURL.split('&'),
              sParameterName,
              i;

          for (i = 0; i < sURLVariables.length; i++) {
              sParameterName = sURLVariables[i].split('=');

              if (sParameterName[0] === sParam) {
                  return sParameterName[1] === undefined ? true : sParameterName[1];
              }
          }
      };

// gezocht op
var gssQuery = getUrlParameter('Zoe') || '';

//zoekform tonen
$(".gss-results").prepend('<form id="searchform" method="get" action="http://intranet.amsterdam.nl/testsitewebteam/zoeken/"><div><input type="text" id="searchkeywordz" name="Zoe" class="q" value="" size="32" maxlength="256" autocomplete="off"></div><div><input id="bigsearchbutton" type="submit" class="zoeken" name="btnG" value="Zoeken"></div></form>');

$("#searchkeywordz").val(gssQuery);

//paging start variabele
var gssStart = getUrlParameter('start')  || '1';

// functie die wordt aangeroepen nadat json binnen is
      function hndlr(response) {
      var GSSgeneratedHTML ="";

      //loop over alle zoekresultaten
      if ( typeof response.items !== 'undefined') {
        for (var i = 0; i < response.items.length; i++) {
          var item = response.items[i];
          itemTitle = item.title;
          
             var amsterdameruit = itemTitle.split(" - ");
             if(typeof(amsterdameruit[1]) !== 'undefined'){
                  itemTitle = amsterdameruit[0];
             }
          
          // broodkruimelpad eerste item vanaf home
          GSSbreadcrumb = "";
          if ( typeof item.pagemap.breadcrumb !== 'undefined' && typeof item.pagemap.breadcrumb[1] !== 'undefined') {
            GSSbreadcrumb = '<div class="gss-breadcrumb">'+ item.pagemap.breadcrumb[1].title +'</div>';
            }


          //toon liefst de samenvatting. Als die er niet is de snippet  
          if ( typeof item.pagemap.metatags[0]["dcterms.description"] !== 'undefined') {
            //console.log('metatags='+item.pagemap.metatags[0]["dcterms.description"]); 
            GSSSamenvatting =   item.pagemap.metatags[0]["dcterms.description"];
          }
          else {
            
            GSSSamenvatting = item.snippet;

          }

          //zoekresultaat item totaal HTML
          GSSgeneratedHTML = '<li><div class="gss-title"><a class="gss-title-link"  href="'+ item.link +'">' + itemTitle + '</a></div><div class="gss-snippet">' + GSSSamenvatting +'</div>'+GSSbreadcrumb;
           
          //print alle zoekresultaten naar de pagina
          $( ".gss-search-results" ).append('<ul class="gss-search-result-list">' + GSSgeneratedHTML + '<ul>');


        }
          
          //begin van het pager gedeelte
          var pagerGSS = "";

          //vorige pagina
          if ( typeof response.queries.previousPage !== 'undefined') {
               var VorigeUrl = location.protocol + '//' + location.host + location.pathname + '?Zoe=' + encodeURIComponent(gssQuery) + '&start=' + encodeURIComponent(response.queries.previousPage[0].startIndex);
               $( ".gss-search-results" ).append('<div class="vorigeknop"><a class="volgendelink" href="'+ VorigeUrl +'">Vorige</a></div>');
          }


          //volgende pagina
          if ( typeof response.queries.nextPage !== 'undefined') {

            if (response.searchInformation.totalResults - response.queries.nextPage[0].startIndex - response.queries.nextPage[0].startIndex > 0)  {
              var VolgendeUrl = location.protocol + '//' + location.host + location.pathname + '?Zoe=' + encodeURIComponent(gssQuery) + '&start=' + encodeURIComponent(response.queries.nextPage[0].startIndex);
             console.log('VolgendeUrl='+VolgendeUrl);

              $( ".gss-search-results" ).append('<div class="volgendeknop"><a class="volgendelink" href="'+ VolgendeUrl +'">Volgende</a></div>');

            }

         }

      }
    }

//GSS json script url inclusief zoekvraag en paging startpunt en callback functie
var GSSscriptUrl = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyCMGfdDaSfjqv5zYoS0mTJnOT3e9MURWkU&cx=000633015535049998160:WMX-803900240&q='+encodeURIComponent(gssQuery)+'&start='+encodeURIComponent(gssStart)+'&callback=hndlr'; 

console.log(GSSscriptUrl);

//inladen GSS json resultaten
var s = document.createElement("script");
s.type = "text/javascript";
s.src = GSSscriptUrl;
$("head").append(s); 
