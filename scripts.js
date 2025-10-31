// Nidus Auctions - with SOLD labels + LIVE badges + live countdowns (Newfoundland Time)

const auctionItems = [
  {
    title: "Caterpillar Excavator 320D",
    image:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d2?auto=format&fit=crop&w=1200&q=80",
    price: "$45,000",
    category: "machinery",
    status: "active",
    endTime: "2025-11-02T22:00:00-03:30"
  },
  {
    title: "Siemens Industrial Control Panel",
    image:
      "https://images.unsplash.com/photo-1581092334504-25a04f1882d0?auto=format&fit=crop&w=1200&q=80",
    price: "$1800",
    category: "control-panels",
    status: "active",
    endTime: "2025-11-03T18:30:00-03:30"
  },
  {
    title: "Industrial Gear Assembly",
    image:
      "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1200&q=80",
    price: "$650",
    category: "gears",
    status: "sold",
    endTime: null
  },
  {
    title: "3HP Baldor Motor",
    image:
      "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=1200&q=80",
    price: "$480",
    category: "engine-parts",
    status: "active",
    endTime: "2025-11-05T13:00:00-03:30"
  },
  {
    title: "Tool & Gadget Lot (Assorted)",
    image:
      "https://images.unsplash.com/photo-1526495124232-a04f5ed25e4b?auto=format&fit=crop&w=1200&q=80",
    price: "$150",
    category: "gadgets",
    status: "active",
    endTime: "2025-11-01T21:00:00-03:30"
  },
  {
    title: "Surplus Electrical Components (Mixed)",
    image:
      "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=1200&q=80",
    price: "$90",
    category: "other",
    status: "active",
    endTime: "2025-11-04T20:30:00-03:30"
  }
];

function getCategoryFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("category");
}

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

function buildAuctionCard(item, index) {
  const timerId = `timer-${index}`;
  const isSold = item.status && item.status.toLowerCase() === "sold";

  // show LIVE only if active + future end time
  let isLive = false;
  if (!isSold && item.endTime) {
    const diff = new Date(item.endTime).getTime() - Date.now();
    if (diff > 0) {
      isLive = true;
    }
  }

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
        ${isLive ? `<span class="live-badge">LIVE</span>` : ""}
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

  grid.innerHTML = itemsToShow
    .map((item, idx) => buildAuctionCard(item, idx))
    .join("");

  startCountdowns();
});

function startCountdowns() {
  const timerEls = document.querySelectorAll(".timer[data-end]");
  if (timerEls.length === 0) return;

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

