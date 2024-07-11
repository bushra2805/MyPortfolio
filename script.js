document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav ul li a");

    function changeNavOnScroll() {
        sections.forEach((section, idx) => {
            const top = section.offsetTop - 50;
            const bottom = top + section.offsetHeight;
            const scroll = window.scrollY;

            if (scroll >= top && scroll < bottom) {
                navLinks[idx].classList.add("active");
            } else {
                navLinks[idx].classList.remove("active");
            }
        });
    }

    window.addEventListener("scroll", changeNavOnScroll);

    // Smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            window.scrollTo({
                top: targetSection.offsetTop - 50,
                behavior: "smooth"
            });
        });
    });

    // Form submission handling
    const form = document.querySelector("form");
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        alert("Thank you for your message. I will get back to you soon!");
        form.reset();
    });

    // Skill charts initialization
    const skillData = [
        { id: 'htmlChart', label: 'HTML', percentage: 90 },
        { id: 'cssChart', label: 'CSS', percentage: 80 },
        { id: 'cChart', label: 'C', percentage: 70 },
        { id: 'pythonChart', label: 'Python', percentage: 85 },
    ];

    skillData.forEach(skill => {
        const ctx = document.getElementById(skill.id).getContext('2d');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: [skill.label, ''],
                datasets: [{
                    data: [skill.percentage, 100 - skill.percentage],
                    backgroundColor: ['#ff5722', '#e0e0e0'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                cutoutPercentage: 70,
                legend: {
                    display: false
                },
                tooltips: {
                    callbacks: {
                        label: function(tooltipItem, data) {
                            let dataset = data.datasets[tooltipItem.datasetIndex];
                            let currentValue = dataset.data[tooltipItem.index];
                            return currentValue + '%';
                        }
                    }
                }
            }
        });
    });
});
