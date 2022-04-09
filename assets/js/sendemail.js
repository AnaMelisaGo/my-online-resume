function sendMail(contactForm) {
    emailjs.send('melisa-resume', 'anamelisago-resume', {
        'from_name': contactForm.name.value,
        'from_email': contactForm.emailaddress.value,
        'project_request': contactForm.projectsummary.value
    })
    .then(
        function(response) {
            alert("Message sent! I'll get in touch with you as soon as possible. Thank you!")
            console.log('Success!', response);
        }, function(errorResponse) {
            console.log('FAILED', errorResponse);
        });
    return false;
}