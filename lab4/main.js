const timerEl = document.getElementById("timer");
let totalSeconds = 60 * 60;

function updateTimer() {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formatted =
    String(hours).padStart(2, "0") + ":" +
    String(minutes).padStart(2, "0") + ":" +
    String(seconds).padStart(2, "0");

  if (timerEl) {
    timerEl.textContent = formatted;
  }

  totalSeconds--;

  if (totalSeconds < 0) {
    totalSeconds = 60 * 60;
  }
}

updateTimer();
setInterval(updateTimer, 1000);

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
  });
}

const reviewsList = document.getElementById("reviewsList");
const reviewForm = document.getElementById("reviewForm");
const reviewName = document.getElementById("reviewName");
const reviewText = document.getElementById("reviewText");
const formMessage = document.getElementById("formMessage");

const DEFAULT_AVATAR = "images/default-review.jpg";
const COOKIE_NAME = "reviews";

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getReviewsFromHTML() {
  if (!reviewsList) return [];

  const reviewElements = reviewsList.querySelectorAll(".review");
  const result = [];

  reviewElements.forEach((review) => {
    const imageEl = review.querySelector(".review-avatar");
    const whoEl = review.querySelector(".who");
    const quoteEl = review.querySelector(".quote");

    const nameFromData = review.dataset.name || "";
    const textFromData = review.dataset.text || "";
    const imageFromData = review.dataset.image || "";

    const nameFromHtml = whoEl ? whoEl.textContent.replace("—", "").trim() : "";
    const textFromHtml = quoteEl ? quoteEl.textContent.trim() : "";
    const imageFromHtml = imageEl ? imageEl.getAttribute("src") : "";

    result.push({
      name: nameFromData || nameFromHtml,
      text: textFromData || textFromHtml,
      image: imageFromData || imageFromHtml || DEFAULT_AVATAR
    });
  });

  return result;
}

function createReviewElement(review) {
  const article = document.createElement("article");
  article.className = "review";

  const imageSrc = review.image && review.image.trim()
    ? review.image.trim()
    : DEFAULT_AVATAR;

  article.dataset.name = review.name;
  article.dataset.text = review.text;
  article.dataset.image = imageSrc;

  article.innerHTML = `
    <div class="review-head">
      <img class="review-avatar" src="${escapeHtml(imageSrc)}" alt="Фото автора отзыва">
      <div class="review-body">
        <div class="stars">★★★★★</div>
        <p class="quote">${escapeHtml(review.text)}</p>
        <p class="who">— ${escapeHtml(review.name)}</p>
      </div>
    </div>
  `;

  return article;
}

function renderReviews(reviews) {
  if (!reviewsList) return;

  reviewsList.innerHTML = "";

  reviews.forEach((review) => {
    const article = createReviewElement(review);
    reviewsList.appendChild(article);
  });
}

function validateReview(name, text) {
  if (name.trim().length < 2) {
    return "Имя должно содержать минимум 2 символа.";
  }

  if (text.trim().length < 10) {
    return "Текст отзыва должен содержать минимум 10 символов.";
  }

  return "";
}

let reviews = CookieStore.getJSON(COOKIE_NAME);

if (!Array.isArray(reviews) || reviews.length === 0) {
  reviews = getReviewsFromHTML();
  CookieStore.setJSON(COOKIE_NAME, reviews, 7);
} else {
  renderReviews(reviews);
}

if (reviewForm) {
  reviewForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = reviewName.value;
    const text = reviewText.value;

    const error = validateReview(name, text);

    if (error) {
      formMessage.textContent = error;
      formMessage.classList.remove("success");
      return;
    }

    const newReview = {
      name: name.trim(),
      text: text.trim(),
      image: DEFAULT_AVATAR
    };

    reviews.unshift(newReview);

    CookieStore.setJSON(COOKIE_NAME, reviews, 7);
    renderReviews(reviews);

    reviewForm.reset();
    formMessage.textContent = "Отзыв успешно добавлен.";
    formMessage.classList.add("success");
  });
}