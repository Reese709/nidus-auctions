// Nidus Auctions - static data for now
const auctionItems = [
  {
    title: "Caterpillar Excavator 320D",
    image:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d2?auto=format&fit=crop&w=1200&q=80",
    price: "$45,000",
    category: "Heavy Equipment",
  },
  {
    title: "Siemens Industrial Control Panel",
    image:
      "https://images.unsplash.com/photo-1581092334504-25a04f1882d0?auto=format&fit=crop&w=1200&q=80",
    price: "$2,200",
    category: "Control Panels",
  },
  {
    title: "Industrial Gear Assembly",
    image:
      "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80",
    price: "$650",
    category: "Machine Parts",
  },
  {
    title: "3HP Baldor Motor",
    image:
      "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=1200&q=80",
    price: "$480",
    category: "Motors",
  },
];

window.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("auction-grid");
  if (grid) {
    grid.innerHTML = auctionItems
      .map(
        (item) => `
      <div class="auction-item">
        <img src="${item.image}" alt="${item.title}">
        <div class="info">
          <h3>${item.title}</h3>
          <p><strong>${item.category}</strong></p>
          <p>Starting at ${item.price}</p>
        </div>
      </div>
    `
      )
      .join("");
  }
});
