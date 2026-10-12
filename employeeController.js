/*
    MIT License
    
    Copyright (c) 2025 Christian I. Cabrera || XianFire Framework
    Mindoro State University - Philippines

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
    */
import { Employee, sequelize } from "../models/Employee.js";
await sequelize.sync();

const employee = {
  index: async (req, res) => {
    try {
      const employees = await Employee.findAll();
      const data = employees.map(emp => emp.get({ plain: true }));
      res.render("employee/index", { data });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  add: async (req, res) => {
    res.render("employee/create");
  },

  insert: async (req, res) => {
    try {
      const { FirstName, LastName, Position, Department, Salary, DateHired } = req.body;
      await Employee.create({ FirstName, LastName, Position, Department, Salary, DateHired });
      res.redirect("/employees");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  show: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await Employee.findByPk(id);
      res.render("employee/show", { data });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  edit: async (req, res) => {
    try {
      const id = req.params.id;
      const data = await Employee.findByPk(id);
      res.render("employee/edit", { data });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updates: async (req, res) => {
    try {
      const { id } = req.params;
      const { FirstName, LastName, Position, Department, Salary, DateHired } = req.body;
      await Employee.update(
        { FirstName, LastName, Position, Department, Salary, DateHired },
        { where: { id } }
      );
      res.redirect("/employees");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await Employee.destroy({ where: { id } });
      res.redirect("/employees");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export { employee };