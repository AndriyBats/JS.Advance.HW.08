let f1 = document.forms.f1;
f1.inputSearch.addEventListener('input', function () {
    if (this.value !== '') {
        f1.btnClose.style.display = 'block';
    } else {
        f1.btnClose.style.display = 'none';
    }
})

f1.btnClose.addEventListener('click', function () {
    f1.inputSearch.value = '';
    f1.btnClose.style.display = 'none';
})

f1.btnSearch.addEventListener('click', function () {
    document.querySelector('.movie-list').innerHTML = '';
    const XHR = new XMLHttpRequest();
    let valueSearch = f1.inputSearch.value;
    XHR.open('GET', `http://www.omdbapi.com/?s=${valueSearch}&apikey=cd878d37`);
    XHR.onreadystatechange = function () {
        if (XHR.readyState === 4 && XHR.status === 200) {
            const data = JSON.parse(XHR.responseText);
            data.Search.forEach(element => {
                let myDiv = `
                <div name="${element.imdbID}" class="my-div">
                    <div class="poster" style="background-image: url(${element.Poster});"></div>
                    <h3 class="title">${element.Title}</h3>
                    <p class="type">${element.Type}</p>
                    <p class="year">${element.Year}</p>
                    <input type="button" class="btn-more-details" value="More details">
                </div>`;
                document.querySelector('.movie-list').insertAdjacentHTML('beforeend', myDiv);
            });
        }
    }
    XHR.send();
})

document.querySelector('.movie-list').addEventListener('click', function (event) {
    if(event.target.classList.contains('btn-more-details')){
        document.querySelector('.modal').style.display = 'block';
        document.querySelector('.shadow').style.display = 'block';
        let myID = event.target.parentElement.getAttribute('name');
        const XHR = new XMLHttpRequest();
        XHR.open('GET', `http://www.omdbapi.com/?i=${myID}&apikey=cd878d37`);
        XHR.onreadystatechange = function(){
            if(XHR.readyState === 4 && XHR.status === 200){
                const data = JSON.parse(XHR.responseText);
                console.log(data); 
                let myRatings = '';
                data.Ratings.forEach(element =>{
                    myRatings += `<p>${element.Source} ${element.Value}</p>` 
                })
                let contentList = `
                <div class="my-modal">
                    <div class="my-modal-left" style="background-image: url(${data.Poster});"></div>
                    <div class="my-modal-right">
                        <div class="title">${data.Title}</div>
                        <div class="rated-year-genre">${data.Rated} ${data.year} ${data.Genre}</div>
                        <div class="plot">${data.Plot}</div>
                        <div class="writer"><span>Written by:</span> ${data.Writer}</div>
                        <div class="director"><span>Directed by:</span> ${data.Director}</div>
                        <div class="actors"><span>Starring:</span> ${data.Actors}</div>
                        <div class="box-office"><span>BoxOffice:</span> ${data.BoxOffice}</div>
                        <div class="awards"><span>Awards:</span> ${data.Awards}</div>
                        <div class="ratings"><span>Ratings:</span> ${myRatings}</div>

                    </div>
                </div>`;
                document.querySelector('.modal-content').insertAdjacentHTML('beforeend', contentList);
            }
        }  
        XHR.send(); 
    }    
})

document.querySelector('.modal').addEventListener('click', function(event){
    if(!event.target.classList.contains('modal-content')){
        console.log('hello');
        document.querySelector('.modal').style.display = 'none';
        document.querySelector('.shadow').style.display = 'none';
        document.querySelector('.modal-content').innerHTML = '';
    }
})