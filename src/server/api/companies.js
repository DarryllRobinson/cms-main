const express = require('express');
const companiesRouter = express.Router();

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');
/*
companiesRouter.param('companyId', (req, res, next, companyId) => {
  console.log('In companyId router param', companyId);
  const sql = 'SELECT * FROM company WHERE company.id = $companyId';
  const values = {$companyId: companyId};
  db.get(sql, values, (error, company) => {
    if (error) {
      next(error);
    } else if (company) {
      req.company = company;
      next();
    } else {
      res.sendStatus(404);
    }
  });
});
*/
companiesRouter.param('companyname', (req, res, next, companyname) => {
  console.log('In companyname router param');
  const sql = 'SELECT * FROM company WHERE company.companyname = $companyname';
  const values = {$companyname: companyname};
  db.get(sql, values, (error, company) => {
    if (error) {
      next(error);
    } else if (company) {
      req.company = company;
      next();
    } else {
      res.sendStatus(404);
    }
  });
});

companiesRouter.get('/', (req, res, next) => {
  db.all('SELECT * FROM company WHERE company.is_current_company = 1',
    (err, companies) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json({companies: companies});
      }
    });
});
/*
companiesRouter.get('/:companyId', (req, res, next) => {
  res.status(200).json({company: req.company});
});
*/
companiesRouter.get('/:companyname', (req, res, next) => {
  res.status(200).json({company: req.company});
});

companiesRouter.post('/', (req, res, next) => {
  const name = req.body.company.name,
        address1 = req.body.company.address1,
        address2 = req.body.company.address2,
        address3 = req.body.company.address3,
        address4 = req.body.company.address4,
        industry = req.body.company.industry,
        contact-first = req.body.company.contact-first,
        contact-surname = req.body.company.contact-surname,
        contact-email = req.body.company.contact-email,
        contact-cell = req.body.company.contact-cell,
        is_current_company = req.body.company.is_current_company === 0 ? 0 : 1;
  if (!name || !address1 || !address2 || !address3 ||!address4 ||!industry ||!contact-first ||!contact-surname ||!contact-email ||!contact-cell) {
    return res.sendStatus(400);
  }

  const sql = 'INSERT INTO company (companyname, password, firstname, surname, email, cell, is_current_company)' +
      'VALUES ($companyname, $password, $firstname, $surname, $email, $cell $is_current_company)';
  const values = {
    $companyname: companyname,
    $password: password,
    $firstname: firstname,
    $surname: surname,
    $email: email,
    $cell: cell,
    $is_current_company: is_current_company
  };

  db.run(sql, values, function(error) {
    if (error) {
      next(error);
    } else {
      db.get(`SELECT * FROM company WHERE company.id = ${this.lastID}`,
        (error, company) => {
          res.status(201).json({company: company});
        });
    }
  });
});

companiesRouter.put('/:companyId', (req, res, next) => {
  const companyname = req.body.company.companyname,
        password = req.body.company.password,
        firstname = req.body.company.firstname,
        surname = req.body.company.surname,
        email = req.body.company.email,
        cell = req.body.company.cell,
        is_current_company = req.body.company.is_current_company === 0 ? 0 : 1;
  if (!companyname || !password || !firstname || !surname ||!email ||!cell) {
    return res.sendStatus(400);
  }

  const sql = 'UPDATE company SET companyname = $companyname, password = $password, firstname = $firstname, ' +
      'surname = $surname, email = $email, cell = $cell, is_current_company = $is_current_company ' +
      'WHERE company.id = $companyId';
  const values = {
    $companyname: companyname,
    $password: password,
    $firstname: firstname,
    $surname: surname,
    $email: email,
    $cell: cell,
    $is_current_company: is_current_company,
    $companyId: req.params.companyId
  };

  db.run(sql, values, (error) => {
    if (error) {
      next(error);
    } else {
      db.get(`SELECT * FROM company WHERE company.id = ${req.params.companyId}`,
        (error, company) => {
          res.status(200).json({company: company});
        });
    }
  });
});

companiesRouter.delete('/:companyId', (req, res, next) => {
  const sql = 'UPDATE company SET is_current_company = 0 WHERE company.id = $companyId';
  const values = {$companyId: req.params.companyId};

  db.run(sql, values, (error) => {
    if (error) {
      next(error);
    } else {
      db.get(`SELECT * FROM company WHERE company.id = ${req.params.companyId}`,
        (error, company) => {
          res.status(200).json({company: company});
        });
    }
  });
});

module.exports = companiesRouter;
