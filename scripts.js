// Nidus Auctions - now with status + countdown
// NOTE: times are in ISO format (YYYY-MM-DDTHH:MM:SSZ)

const auctionItems = [
  {
    title: "Caterpillar Excavator 320D",
    image:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d2?auto=format&fit=crop&w=1200&q=80",
    price: "$45,000",
    category: "machinery",
    status: "active",
    endTime: "2025-11-02T23:59:00Z" // change to your time
  },
  {
    title: "Allen-Bradley MCC Panel",
    image:
      "https://your-photo-here.jpg",
    price: "$3500",
    category: "control-panels",
    status: "active",
    endTime: "2025-11-03T16:00:00Z"
  },
  {
    title: "Industrial Gear Assembly",
    image:
      "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80",
    price: "$650",
    category: "gears",
    status: "sold",           // 👈 this one will show SOLD
    endTime: null
  },
  {
    title: "3HP Baldor Motor",
    image:
      "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=1200&q=80",
    price: "$480",
    category: "engine-parts",
    status: "active",
    endTime: "2025-11-05T13:30:00Z"
  },
  {
    title: "Tool & Gadget Lot (Assorted)",
    image:
      "https://images.unsplash.com/photo-1526495124232-a04f5ed25e4b?auto=format&fit=crop&w=1200&q=80",
    price: "$150",
    category: "gadgets",
    status: "active",
    endTime: "2025-11-01T23:00:00Z"
  },
  {
    title: "Surplus Electrical Components (Mixed)",
    image:
      "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=1200&q=80",
    price: "$90",
    category: "other",
    status: "active",
    endTime: "2025-11-04T20:00:00Z"
  }
];

function getCategoryFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("category"); // e.g. "gears"
}

// format category for display
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

// helper: build HTML for one card
function buildAuctionCard(item, index) {
  // each card gets a unique timer id
  const timerId = `timer-${index}`;
  const isSold = item.status && item.status.toLowerCase() === "sold";

  return `
    <div class="auction-item ${isSold ? "is-sold" : ""}">
      <div class="img-wrap">
        ${isSold ? '<span class="sold-badge">SOLD</span>' : ""}
        <img src="${item.image}" alt="${item.title}">
      </div>
      <div class="info">
        <h3>${item.title}</h3>
        <p><strong>${formatCategory(item.category)}</strong></p>
        <p>Starting at ${item.price}</p>
        ${
          !isSold && item.endTime
            ? `<p class="timer" id="${timerId}" data-end="${item.endTime}">Loading timer...</p>`
            : isSold
            ? `<p class="timer ended">Auction closed</p>`
            : ""
        }
      </div>
    </div>
  `;
}

window.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("auction-grid");
  if (!grid) return;

  const selectedCategory = getCategoryFromURL();

  let itemsToShow = auctionItems;
  if (selectedCategory) {
    itemsToShow = auctionItems.filter(
      (item) => item.category === selectedCategory
    );
  }

  if (itemsToShow.length === 0) {
    grid.innerHTML = `<p>No auctions found for this category.</p>`;
    return;
  }

  // render cards
  grid.innerHTML = itemsToShow
    .map((item, idx) => buildAuctionCard(item, idx))
    .join("");

  // start countdowns
  startCountdowns();
});

function startCountdowns() {
  const timerEls = document.querySelectorAll(".timer[data-end]");
  if (timerEls.length === 0) return;

  // update every second
  setInterval(() => {
    timerEls.forEach((el) => {
      const endTime = el.getAttribute("data-end");
      const diff = new Date(endTime).getTime() - Date.now();

      if (diff <= 0) {
        el.textContent = "Auction ended";
        el.classList.add("ended");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diff % (1000 * 60)) / 1000);

      el.textContent = `${days}d ${hours}h ${mins}m ${secs}s`;
    });
  }, 1000);
}

