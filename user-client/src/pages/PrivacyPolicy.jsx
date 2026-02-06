import "../styles/Policy.css";

const PrivacyPolicy = () => {
  return (
    <div className="policy-page">
      <h1>Privacy Policy</h1>

      <p>
        At <strong>KidsStore</strong>, we respect your privacy and are committed
        to protecting your personal data.
      </p>

      <h2>Information We Collect</h2>
      <ul>
        <li>Email address</li>
        <li>Order and account information</li>
        <li>Usage data and cookies</li>
      </ul>

      <h2>How We Use Your Information</h2>
      <ul>
        <li>To process orders</li>
        <li>To send order updates and offers</li>
        <li>To improve our services</li>
      </ul>

      <h2>Cookies</h2>
      <p>
        We use cookies to enhance your browsing experience. You can manage your
        preferences anytime.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
