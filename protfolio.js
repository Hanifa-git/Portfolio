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
                    return { scale: 1.8, xPercent: 0, yPercent: 0 };
                case "about":
                    return { scale: 0.3, xPercent: 17, yPercent: 85 };
                case "Works":
                    return { scale: 2.5, xPercent: 0, yPercent: 250 };
            }
        } else if (screenWidth <= 768) {  // Tablet (Small)
            switch (sectionId) {
                case "banner":
                    return { scale: 0.8, xPercent: 0, yPercent: 0 };
                case "about":
                    return { scale: 0.5, xPercent: -10, yPercent: 100 };
                case "Works":
                    return { scale: 1.0, xPercent: 0, yPercent: 250 };   
            }
        } else if (screenWidth <= 1024) {  // Small Laptops (Medium)
            switch (sectionId) {
                case "banner":
                    return { scale: 1.1, xPercent: 0, yPercent: 0 };
                case "about":
                    return { scale: 0.5, xPercent: -15, yPercent: 70 };
                case "Works":
                    return { scale: 3.5, xPercent: 0, yPercent: 190 };
               
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

    // Toggle Side Menu
    function toggleMenu() {
        document.getElementById("sideMenu").classList.toggle("active");
    }
}