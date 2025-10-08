const gridFoods = document.getElementById("grid");
const search = document.getElementById("search");
const statusSearch = document.getElementById("status");

let listFoods = [];

// Lấy dữ liệu từ API
async function getData() {
  try {
    const response = await fetch(
      "https://68aad6e8909a5835049d1f7a.mockapi.io/foods"
    ); // Gửi yêu cầu GET
    if (!response.ok) throw new Error("Lỗi mạng hoặc API"); // Kiểm tra lỗi
    const data = await response.json(); // Chuyển phản hồi thành JSON
    const datafood = data;
    listFoods = datafood;
    renderfoods(datafood);
  } catch (error) {
    console.error("Lỗi:", error.message); // Xử lý lỗi
  }
}
getData();

function renderfoods(datafood) {
  const valueInput = search.value.toLowerCase();
  // tạo mảng chứa các món ăn
  const datasearch = datafood.filter((item) =>
    item.name.toLowerCase().includes(valueInput)
  );
  // nếu datafood rỗng
  if (datasearch.length === 0) {
    //block statusSearch
    statusSearch.style.display = "block";
    gridFoods.innerHTML = "";
    return;
  }
  statusSearch.style.display = "none";

  datasearch.forEach((food) => {
    gridFoods.innerHTML += `
            <article class="card">
                <span class="badge">${food.category}</span>
                <img class="thumb"
                    src="${food.image}"
                    alt="${food.name}" loading="lazy">
                <div class="body">
                    <h3 class="name">${food.name}</h3>
                    <p class="desc">${food.description}</p>
                    <div class="row">
                        <span class="price">${food.price} VND</span>
                        <button class="add-btn">Thêm</button>
                    </div>
                </div>
            </article>
    `;
  });
}
getData();

search.addEventListener("input", function () {
  renderfoods(listFoods);
});
