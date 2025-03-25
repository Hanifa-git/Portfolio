{
    // 🌍 Three.js Animation
    const scene = new THREE.Scene();
    const container = document.getElementById("earth-container");
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Initialize renderer with dynamic size
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // Initialize camera with dynamic aspect ratio
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    // 🎨 Load Earth Texture
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(
        'test.png',
        () => console.log("✅ Image loaded successfully!"),
        undefined,
        (err) => console.error("❌ Error loading image!", err)
    );

    // 🌎 Earth Sphere
    const geometry = new THREE.SphereGeometry(2, 64, 64);
    const material = new THREE.MeshStandardMaterial({ map: texture });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // ☀️ Lighting
    const mainLight = new THREE.PointLight(0xffffff, 1, 100);
    mainLight.position.set(5, 5, 5);
    scene.add(mainLight);

    // 🌟 Purple Glow Light
    const glowLight = new THREE.PointLight(0xFA34E6, 3, 5);
    glowLight.position.set(-3, -2, 3);
    glowLight.decay = 2;
    scene.add(glowLight);

    // 🔄 Rotation Animation
    function animate() {
        requestAnimationFrame(animate);
        sphere.rotation.y += 0.005;
        renderer.render(scene, camera);
    }
    animate();

    // 🖥️ Handle Window Resize
    window.addEventListener("resize", () => {
        const newWidth = container.clientWidth;
        const newHeight = container.clientHeight;

        // Update renderer size
        renderer.setSize(newWidth, newHeight);

        // Update camera aspect ratio
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
    });

    // Ensure GSAP & ScrollTrigger are registered
    gsap.registerPlugin(ScrollTrigger);

    // Function to animate Earth responsively
    function animateEarthToSection(scale, xPercent, yPercent) {
        const earthContainer = document.getElementById("earth-container");

        // Calculate pixel values from percentages
        const x = (window.innerWidth * xPercent) / 100;
        const y = (window.innerHeight * yPercent) / 100;

        // Apply CSS transforms using GSAP
        gsap.to(earthContainer, {
            scale: scale,
            x: x,
            y: y,
            ease: "power1.out",
            duration: 1,
        });
    }

    // Function to get responsive size and position for each section
    function getSectionConfig(sectionId) {
        const screenWidth = window.innerWidth;

        if (screenWidth <= 546) {  // Mobile (Extra Small)
            switch (sectionId) {
                case "banner":
                    return { scale: 2.8, xPercent: 0, yPercent: -12 };
                case "about":
                    return { scale: 0.9, xPercent: 25, yPercent: 75 };
                case "Works":
                    return { scale: 3.7, xPercent: 0, yPercent: 270 };
            }
        } else if (screenWidth <= 768) {  // Tablet (Small)
            switch (sectionId) {
                case "banner":
                    return { scale: 2.5, xPercent: 0, yPercent: 0 };
                case "about":
                    return { scale: 0.5, xPercent: -15, yPercent: 88 };
                case "Works":
                    return { scale: 3.2, xPercent: 0, yPercent: 290 };   
            }
        } else if (screenWidth <= 1024) {  // Small Laptops (Medium)
            switch (sectionId) {
                case "banner":
                    return { scale: 2.2, xPercent: 0, yPercent: 0 };
                case "about":
                    return { scale: 0.5, xPercent: -15, yPercent: 84 };
                case "Works":
                    return { scale: 3.5, xPercent: 0, yPercent: 290 };
               
            }
        } else {  // Desktop (Large)
            switch (sectionId) {
                case "banner":
                    return { scale: 1.5, xPercent: 0, yPercent: 0 };
                case "about":
                    return { scale: 0.6, xPercent: -15, yPercent: 100 };
                case "Works":
                    return { scale: 2.0, xPercent: 0, yPercent: 250 };
                
            }
        }
    }

    // Function to handle window resize
    function handleResize() {
        const activeSection = document.querySelector("section.active");
        if (activeSection) {
            const { scale, xPercent, yPercent } = getSectionConfig(activeSection.id);
            animateEarthToSection(scale, xPercent, yPercent);
        }
    }

    // Add resize event listener
    window.addEventListener("resize", handleResize);

    // Get all sections dynamically
    const sections = document.querySelectorAll("section");

    // ScrollTrigger for sections
    sections.forEach((section) => {
        ScrollTrigger.create({
            trigger: section,
            start: "top 50%",
            end: "bottom 50%",
            onEnter: () => handleScrollTrigger(section),
            onEnterBack: () => handleScrollTrigger(section),
        });
    });

    // Section-based positioning using percentage-based values
    function handleScrollTrigger(section) {
        const { scale, xPercent, yPercent } = getSectionConfig(section.id);
        animateEarthToSection(scale, xPercent, yPercent);
    }

    // Typing Effect for Text
    document.addEventListener("DOMContentLoaded", function () {
        let text = "I can do Front-end developing and Graphic Designing too...";
        let paragraph = document.getElementById("typed-text");
        let speed = 100; // Typing speed in milliseconds

        function typeText(index) {
            if (index < text.length) {
                paragraph.innerHTML += text[index]; // Append next character
                setTimeout(() => typeText(index + 1), speed);
            }
        }

        function resetTypingEffect() {
            paragraph.innerHTML = ""; // Clear text before re-typing
            typeText(0);
        }

        // Intersection Observer to detect when section enters viewport
        let observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        resetTypingEffect();
                    }
                });
            },
            { threshold: 0.5 } // Triggers when 50% of the section is visible
        );

        observer.observe(document.querySelector(".little-secret"));
    });

    // Typing Effect for Subtitle
    document.addEventListener("DOMContentLoaded", function () {
        let text = "Designing for users who are out of this world… because the ones on Earth already expect their apps to work like magic.";
        let subtitle = document.getElementById("typed-subtitle");
        let speed = 50; // Typing speed in milliseconds

        function typeText(index) {
            if (index < text.length) {
                subtitle.innerHTML += text[index]; // Append next character
                setTimeout(() => typeText(index + 1), speed);
            }
        }

        function resetTypingEffect() {
            subtitle.innerHTML = ""; // Clear text before re-typing
            typeText(0);
        }

        // Intersection Observer to detect when the section enters viewport
        let observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        resetTypingEffect();
                    }
                });
            },
            { threshold: 0.5 } // Triggers when 50% of the section is visible
        );

        observer.observe(document.querySelector(".subtitle"));
    });

    // Get elements
const hamburgerMenu = document.getElementById("hamburger-menu");
const navLinks = document.getElementById("nav-links");

// Toggle the active class to show/hide the menu
hamburgerMenu.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// Project Data
const projects = [
    {
        heading: "Project One",
        description: "A cutting-edge UI design that enhances user experience and accessibility.",
        image1: "./assets/image/image.png",
        image2: "./assets/image/image.png"
    },
    {
        heading: "Project Two",
        description: "An innovative e-commerce platform with seamless navigation and smooth interactions.",
        image1: "./assets/image/logo2.png",
        image2: "./assets/image/logo2.png"
    },
    {
        heading: "Project Three",
        description: "A futuristic dashboard with data-driven insights for better decision-making.",
        image1: "./assets/image/image.png",
        image2: "./assets/image/image.png"
    }
];

let currentIndex = -1; // Start without displaying anything

function typeText(element, text, callback) {
    element.textContent = "";
    let i = 0;
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, 50);
        } else {
            if (callback) callback();
        }
    }
    type();
}

function updateProject() {
    const heading = document.getElementById("project-heading");
    const description = document.getElementById("project-description");
    const image1 = document.getElementById("project-image1");
    const image2 = document.getElementById("project-image2");

    // Fade out images
    image1.classList.remove("show");
    image2.classList.remove("show");

    setTimeout(() => {
        // Move to next project
        currentIndex = (currentIndex + 1) % projects.length;

        // Typing effect for heading & description
        typeText(heading, projects[currentIndex].heading, () => {
            typeText(description, projects[currentIndex].description);
        });

        // Change image sources
        image1.src = projects[currentIndex].image1;
        image2.src = projects[currentIndex].image2;

        // Show images with slide-in effect
        setTimeout(() => {
            image1.classList.remove("d-none");
            image2.classList.remove("d-none");
            image1.classList.add("show");
            setTimeout(() => image2.classList.add("show"), 500); // Staggered slide-in
        }, 500);

    }, 500); // Wait for fade-out before changing content
}

// Start showing projects every 5 seconds
setTimeout(updateProject, 0); // Show first project immediately
setInterval(updateProject, 8000);


}


