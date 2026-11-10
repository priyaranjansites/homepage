const cards = [...document.querySelectorAll(".project")];
const search = document.getElementById("search");
const count = document.getElementById("count");
let activeFilter = "all";

function updateProjects() {
	const term = search.value.trim().toLowerCase();
	let visible = 0;
	cards.forEach(card => {
		const matchesCategory = activeFilter === "all" || card.dataset.category === activeFilter;
		const matchesSearch = card.dataset.name.includes(term) || card.querySelector("h3").textContent.toLowerCase().includes(term);
		card.hidden = !(matchesCategory && matchesSearch);
		if (!card.hidden) visible++;
	});
	count.textContent = `${visible} ${visible === 1 ? "website" : "websites"}`;
	let empty = document.querySelector(".empty");
	if (!visible && !empty) {
		empty = document.createElement("div");
		empty.className = "empty";
		empty.textContent = "No projects found. Try another search or category.";
		document.getElementById("project-grid").append(empty);
	} else if (visible && empty) empty.remove();
}

document.querySelectorAll(".filter").forEach(button => button.addEventListener("click", () => {
	document.querySelector(".filter.active").classList.remove("active");
	button.classList.add("active");
	activeFilter = button.dataset.filter;
	updateProjects();
}));
search.addEventListener("input", updateProjects);

// A lightweight animated particle network adds a subtle tech feel without a large background image.
(() => {
	const canvas = document.getElementById("tech-bg");
	const ctx = canvas.getContext("2d");
	const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
	let width = 0, height = 0, points = [], frame;
	function resize() {
		const ratio = Math.min(devicePixelRatio || 1, 2);
		width = innerWidth; height = innerHeight;
		canvas.width = width * ratio; canvas.height = height * ratio;
		ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
		const amount = Math.min(65, Math.max(28, Math.floor(width / 22)));
		points = Array.from({ length: amount }, () => ({ x: Math.random() * width, y: Math.random() * height, vx: (Math.random() - .5) * .19, vy: (Math.random() - .5) * .19, r: Math.random() * 1.4 + .5 }));
	}
	function draw() {
		ctx.clearRect(0, 0, width, height);
		points.forEach((point, index) => {
			if (!reduceMotion) {
				point.x += point.vx; point.y += point.vy;
				if (point.x < 0 || point.x > width) point.vx *= -1;
				if (point.y < 0 || point.y > height) point.vy *= -1;
			}
			ctx.beginPath(); ctx.arc(point.x, point.y, point.r, 0, Math.PI * 2);
			ctx.fillStyle = "rgba(167, 157, 255, .68)"; ctx.fill();
			for (let next = index + 1; next < points.length; next++) {
				const other = points[next], distance = Math.hypot(point.x - other.x, point.y - other.y);
				if (distance < 135) {
					ctx.beginPath(); ctx.moveTo(point.x, point.y); ctx.lineTo(other.x, other.y);
					ctx.strokeStyle = `rgba(111, 204, 220, ${(1 - distance / 135) * .13})`; ctx.lineWidth = .7; ctx.stroke();
				}
			}
		});
		if (!reduceMotion) frame = requestAnimationFrame(draw);
	}
	addEventListener("resize", () => { cancelAnimationFrame(frame); resize(); draw(); });
	resize(); draw();
})();
