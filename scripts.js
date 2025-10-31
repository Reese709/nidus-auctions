// Nidus Auctions - static data for now
const auctionItems = [
  {
    title: "Caterpillar Excavator 320D",
    image:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d2?auto=format&fit=crop&w=1200&q=80",
    price: "$45,000",
    category: "machinery",
  },
  {
    title: "Siemens Industrial Control Panel",
    image:
      "https://images.unsplash.com/photo-1581092334504-25a04f1882d0?auto=format&fit=crop&w=1200&q=80",
    price: "$2,200",
    category: "control-panels",
  },
  {
    title: "Industrial Gear Assembly",
    image:
      "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80",
    price: "$650",
    category: "gears",
  },
  {
    title: "3HP Baldor Motor",
    image:
      "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=1200&q=80",
    price: "$480",
    category: "engine-parts",
  },
  {
    title: "Tool & Gadget Lot (Assorted)",
    image:
      "https://images.unsplash.com/photo-1526495124232-a04f5ed25e4b?auto=format&fit=crop&w=1200&q=80",
    price: "$150",
    category: "gadgets",
  },
  {
    title: "Surplus Electrical Components (Mixed)",
    image:
      "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=1200&q=80",
    price: "$90",
    category: "other",
  },
];

function getCategoryFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("category"); // e.g. "gears"
}

window.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("auction-grid");
  if (!grid) return;

  const selectedCategory = getCategoryFromURL();

  // if there's a category in the URL, filter by it
  let itemsToShow = auctionItems;
  if (selectedCategory) {
    itemsToShow = auctionItems.filter(
      (item) => item.category === selectedCategory
    );
  }

  // if no items match, show a friendly message
  if (itemsToShow.length === 0) {
    grid.innerHTML = `<p>No auctions found for this category.</p>`;
    return;
  }

  grid.innerHTML = itemsToShow
    .map(
      (item) => `
      <div class="auction-item">
        <img src="${item.image}" alt="${item.title}">
        <div class="info">
          <h3>${item.title}</h3>
          <p><strong>${formatCategory(item.category)}</strong></p>
          <p>Starting at ${item.price}</p>
        </div>
      </div>
    `
    )
    .join("");
});

// helper to make "control-panels" look nice
function formatCategory(cat) {
  switch (cat) {
    case "machinery":
      return "Industrial Machinery & Equipment/Parts";
    case "control-panels":
      return "Control Panels";
    case "gears":
      return "Gears";
    case "gadgets":
      return "Gadgets";
    case "engine-parts":
      return "Engine Parts";
    case "other":
      return "Other";
    default:
      return cat;
  }
}
