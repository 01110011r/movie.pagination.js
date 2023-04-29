const block = document.querySelector('.block');

const imgStart = 'https://image.tmdb.org/t/p/w500';

const key = 'key=23f5bd2c22d9227192b02969c459d0fa'


let min = 1;

let max = 10;


let currentPage = 1;


const loading = document.createElement('div');
loading.classList.add('loading');
loading.innerHTML = '<p>Loading...</p>';
block.appendChild(loading);



async function fetchData() {
    let url = `https://api.themoviedb.org/3/discover/movie?api_${key}&page=${currentPage}`;

    block.innerHTML = '';

    const result = await fetch(url);
    const data = await result.json();

    console.log(data);
    const counties = data.results;


    try {

        counties.map((dataCountie) => {

            console.log(dataCountie);

            const blockItem = document.createElement('div');
            blockItem.classList.add('block__item');
            block.appendChild(blockItem);


            const img = document.createElement('img');
            blockItem.appendChild(img);
            if (dataCountie.backdrop_path) {
                img.src = `${imgStart}${dataCountie.backdrop_path}`;
            } else { img.src = './images/notimg.png'; }


            const Name = document.createElement('h2');
            blockItem.appendChild(Name);
            Name.textContent = `${dataCountie.title}`




        })




        if (data.total_pages > 1) {
            const pages = document.querySelector('.pages');
            pages.innerHTML = '';

            if (currentPage === max) {
                max = max + 5;
                min = min + 5;

            }

            if (currentPage === min && currentPage !== 1) {
                max = max - 5;
                min = min - 5;

            }




            for (let i = min; i <= max; i++) {





                const btn = document.createElement('button');
                console.log(btn);
                pages.appendChild(btn);
                btn.textContent = i;

                if (currentPage === i) {
                    btn.classList.add('activ')



                }

                btn.addEventListener('click', () => {
                    block.innerHTML = '';
                    currentPage = i;
                    fetchData();
                })




            }





        }






    } catch (error) {
        console.log(error);
    }
}

fetchData();