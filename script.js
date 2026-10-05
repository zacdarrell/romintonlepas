const burgerBtn = document.getElementById('burgerBtn');
        const burgerIcon = document.getElementById('burgerIcon');
        const navMenu = document.getElementById('navMenu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Toggle Burger Menu
        burgerBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');

            // Ganti ikon burger (bars) <-> close (times)
            if (navMenu.classList.contains('active')) {
                burgerIcon.classList.remove('fa-bars');
                burgerIcon.classList.add('fa-xmark');
            } else {
                burgerIcon.classList.remove('fa-xmark');
                burgerIcon.classList.add('fa-bars');
            }
        });

        // Tutup menu saat link diklik (di tampilan mobile)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                burgerIcon.classList.remove('fa-xmark');
                burgerIcon.classList.add('fa-bars');

                // Set status link aktif
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });


        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        let currentSlide = 0;
        const totalSlides = slides.length;
        let autoSlideInterval;

        function showSlide(index) {
            if (index >= totalSlides) {
                currentSlide = 0;
            } else if (index < 0) {
                currentSlide = totalSlides - 1;
            } else {
                currentSlide = index;
            }

            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        nextBtn.addEventListener('click', () => {
            showSlide(currentSlide + 1);
            resetAutoSlide();
        });

        prevBtn.addEventListener('click', () => {
            showSlide(currentSlide - 1);
            resetAutoSlide();
        });

        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const slideIndex = parseInt(e.target.getAttribute('data-slide'));
                showSlide(slideIndex);
                resetAutoSlide();
            });
        });

        function startAutoSlide() {
            autoSlideInterval = setInterval(() => {
                showSlide(currentSlide + 1);
            }, 5000); // Berganti otomatis setiap 5 detik
        }

        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }

        startAutoSlide();

        // DATA SPESIFIKASI MOBIL E4 & L8
        const carsData = {
            e4: {
                name: "Mobil E4",
                price: "Rp 450.000 / Hari",
                image: "img/e4.webp",
                desc: "Mobil compact modern yang efisien dan lincah untuk area perkotaan. Dilengkapi dengan kenyamanan kabin maksimal dan konsumsi bahan bakar yang sangat irit.",
                engine: "1.500 cc Turbo",
                transmisi: "Otomatis (CVT)",
                seats: "5 Penumpang",
                fuel: "Bensin (1:16 km/l)"
            },
            l8: {
                name: "Mobil L8",
                price: "Rp 750.000 / Hari",
                image: "img/l8.webp",
                desc: "SUV bongsor kelas premium dengan performa tangguh di segala medan. Kabin luas dengan kenyamanan eksklusif dan fitur keselamatan tercanggih.",
                engine: "2.500 cc Dual VVT-i",
                transmisi: "Otomatis 8-Speed",
                seats: "7-8 Penumpang",
                fuel: "Bensin (1:12 km/l)"
            }
        };

        // ELEMENT REF
        const tabBtns = document.querySelectorAll('.tab-btn');
        const carCard = document.getElementById('carCard');
        const carImage = document.getElementById('carImage');
        const carPrice = document.getElementById('carPrice');
        const carName = document.getElementById('carName');
        const carDesc = document.getElementById('carDesc');
        const specEngine = document.getElementById('specEngine');
        const specTrans = document.getElementById('specTrans');
        const specSeats = document.getElementById('specSeats');
        const specFuel = document.getElementById('specFuel');

        // FUNGSI GANTI DATA MOBIL
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const carType = this.getAttribute('data-car');

                // Jika tombol yang sama diklik, abaikan
                if (this.classList.contains('active')) return;

                // Reset kelas active tombol
                tabBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                // Efek animasi Fade Out sebelum ganti data
                carCard.classList.add('fade-out');

                setTimeout(() => {
                    const data = carsData[carType];
                    carImage.src = data.image;
                    carPrice.textContent = data.price;
                    carName.textContent = data.name;
                    carDesc.textContent = data.desc;
                    specEngine.textContent = data.engine;
                    specTrans.textContent = data.transmisi;
                    specSeats.textContent = data.seats;
                    specFuel.textContent = data.fuel;

                    // Fade In kembali setelah data berubah
                    carCard.classList.remove('fade-out');
                }, 300);
            });
        });

        // ANIMASI SCROLL REVEAL (INTERSECTION OBSERVER)
        const observerOptions = {
            threshold: 0.15
        };

        const scrollObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target); // Hanya jalankan animasi sekali saat di-scroll
                }
            });
        }, observerOptions);

        document.querySelectorAll('.scroll-reveal').forEach(el => {
            scrollObserver.observe(el);
        });

        const tipeMobilSelect = document.getElementById('tipeMobil');
        const otrInfo = document.getElementById('otrInfo');
        const otrPrice = document.getElementById('otrPrice');
        const kreditForm = document.getElementById('kreditForm');

        // Tampilkan OTR Badge saat mobil dipilih
        tipeMobilSelect.addEventListener('change', function() {
            const selectedOption = this.options[this.selectedIndex];
            const otr = selectedOption.getAttribute('data-otr');
            
            if (otr) {
                otrPrice.textContent = otr;
                otrInfo.classList.add('active');
            } else {
                otrInfo.classList.remove('active');
            }
        });

        // Submit Form ke WhatsApp
        kreditForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Nomor WA Tujuan
            const phoneNumber = "6289522325077";

            // Ambil Nilai Input
            const nama = document.getElementById('nama').value.trim();
            const tipeMobil = tipeMobilSelect.value;
            const selectedOption = tipeMobilSelect.options[tipeMobilSelect.selectedIndex];
            const otr = selectedOption.getAttribute('data-otr');
            const dp = document.getElementById('dp').value.trim();
            const tenor = document.getElementById('tenor').value;
            const domisili = document.getElementById('domisili').value.trim();

            // Format Pesan WhatsApp
            const message = `Halo Admin, saya ingin konsultasi *Simulasi Kredit*:\n\n` +
                            `👤 *Nama*: ${nama}\n` +
                            `🚗 *Tipe Mobil*: ${tipeMobil} (OTR: ${otr})\n` +
                            `💰 *Rencana DP*: ${dp}\n` +
                            `📅 *Rencana Tenor*: ${tenor}\n` +
                            `📍 *Kota / Domisili*: ${domisili}\n\n` +
                            `Mohon bantu perhitungannya ya, terima kasih!`;

            // Encode URI agar karakter spesial dan spasi aman di URL
            const encodedMessage = encodeURIComponent(message);

            // Redirect ke WhatsApp
            const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
            window.open(whatsappURL, '_blank');
        });

        const tradeInForm = document.getElementById('tradeInForm');

        tradeInForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Nomor WA Tujuan
            const phoneNumber = "6289522325077";

            // Ambil Isian Form
            const nama = document.getElementById('nama').value.trim();
            const domisili = document.getElementById('domisili').value.trim();
            const mobilLama = document.getElementById('mobilLama').value.trim();
            const tahunMobil = document.getElementById('tahunMobil').value.trim();
            const kilometer = document.getElementById('kilometer').value.trim();
            const unitLepas = document.getElementById('unitLepas').value;

            // Format Pesan WhatsApp
            const message = `Halo Admin, saya ingin mengajukan *Trade In (Tukar Tambah)*:\n\n` +
                            `👤 *Nama*: ${nama}\n` +
                            `📍 *Domisili*: ${domisili}\n` +
                            `🚘 *Mobil Lama*: ${mobilLama}\n` +
                            `📅 *Tahun Mobil Lama*: ${tahunMobil}\n` +
                            `📊 *Kilometer (KM)*: ${kilometer}\n` +
                            `✨ *Unit Impian (Unit Lepas)*: ${unitLepas}\n\n` +
                            `Mohon bantu estimasi penilaian mobil lama saya ya, terima kasih!`;

            // Encode URI agar spasi & enter aman di link
            const encodedMessage = encodeURIComponent(message);

            // Buka WhatsApp
            const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
            window.open(whatsappURL, '_blank');
        });

        