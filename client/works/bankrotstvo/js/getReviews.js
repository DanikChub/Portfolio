const reviewsElem = document.querySelector('.reviews_reviews');


addEventListener('DOMContentLoaded', () => {
    getReviews()
        .then(reviews => {
            reviews.forEach(review => {
                const reviewElement = document.createElement('div')
                reviewElement.classList.add('review');
                reviewElement.innerHTML = review;
                reviewsElem.appendChild(reviewElement);
            })
        })

    
})

const requestURL = 'http://localhost:5000/api/review'

async function getReviews() {
    
    return await fetch(requestURL)
                .then((data) => data.json())
                .then((data) => makeReviews(data))
                .catch(e => console.log(e));

}

function makeReviews(reviewsArray) {
    
    return (reviewsArray.map(review => {
        // console.log(Date.parse(review.createdAt));
        var timeMs = Date.parse(review.createdAt);
        var date = new Date();
        date.setTime(timeMs);
        var options = {year: 'numeric', month: 'short', day: 'numeric' };
        let createdAt = new Intl.DateTimeFormat('ru-GB',options).format(date);
        return `
            <div class="review_title">${review.name}</div>
            <div class="review_subtitle">${createdAt}</div>
            <p class="review_content">${review.message}</p>
        `
       
    }))
}