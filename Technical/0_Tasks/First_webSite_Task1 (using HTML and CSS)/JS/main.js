function handleSubmit(e) {
    e.preventDefault();
    document.getElementById('form-success').style.display = 'block';
    e.target.reset();
    setTimeout(() => {
        document.getElementById('form-success').style.display = 'none';
    }, 5000);
}