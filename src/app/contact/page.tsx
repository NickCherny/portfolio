const ContactForm = () => {
  return (
    <div>
      <h1>Contact</h1>
      <form>
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <textarea placeholder="Message"></textarea>
        <button>Send</button>
      </form>
    </div>
  );
};

export default ContactForm;
