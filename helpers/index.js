const hbs = require('hbs');
const {applicantServices} = require('../src/services');

hbs.registerHelper('applicantsLst', (id) => {
    let list = applicantServices.getApplicants(id);
    let text;
    list.forEach(it => {
        text =  `<div class="card" style="width: 18rem;">`+
                    `<div class="card-body">` +
                        `<h5 class="card-title">${it.name}</h5>`+
                        `<p class="card-text">${it.email}</p>`+
                        `<p class="card-text">${it.phone}</p>`+
                        `<a href="/applicant/delete?document=${it.document}" class="btn btn-primary">Eliminar</a>`+
                    `</div>` +
                `</div>`;
    });

    return text;
});