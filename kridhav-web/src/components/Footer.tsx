export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div>
          <div className="footer-brand">
            Kridhav <em>गhee</em>
          </div>
          <p>
            Slow-churned. Pure gold. Crafted in India for kitchens that care
            about what goes in the kadhai.
          </p>
          <div className="pay-icons" aria-label="Payment methods">
            <span>UPI</span>
            <span>Cards</span>
            <span>NetBanking</span>
            <span>COD</span>
          </div>
        </div>
        <div>
          <h4>Shop</h4>
          <ul>
            <li>
              <a href="#shop">A2 Desi Cow</a>
            </li>
            <li>
              <a href="#shop">Buffalo Ghee</a>
            </li>
            <li>
              <a href="#gifting">Gift Hampers</a>
            </li>
            <li>
              <a href="#shop">Organic Cultured</a>
            </li>
          </ul>
        </div>
        <div>
          <h4>Connect</h4>
          <ul>
            <li>
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp · +91 99999 99999
              </a>
            </li>
            <li>
              <a href="#" aria-label="Instagram placeholder">
                Instagram · @kridhav
              </a>
            </li>
            <li>
              <a href="mailto:hello@kridhav.demo">hello@kridhav.demo</a>
            </li>
          </ul>
        </div>
        <div>
          <h4>Visit</h4>
          <ul>
            <li>
              <a href="#">[Registered Address – add yours]</a>
            </li>
            <li>
              <a href="#">[Warehouse / Dispatch – add yours]</a>
            </li>
            <li>
              <a href="#purity">FSSAI · [add yours]</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Kridhav Demo · For pitch use only</span>
        <span>Shuddh. Sunehri. Sachha.</span>
      </div>
    </footer>
  );
}
