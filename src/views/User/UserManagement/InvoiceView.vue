<template>
  <div class="container">
    <button @click="downloadDOCX" class="download-btn">Download Invoice (DOCX)</button>

    <div id="invoice" class="invoice">
      <h2>Invoice</h2>
      <p><strong>Invoice No:</strong> #INV-12345</p>
      <p><strong>Date:</strong> {{ new Date().toLocaleDateString() }}</p>

      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in invoiceItems" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.quantity }}</td>
            <td>${{ item.price }}</td>
            <td>${{ item.quantity * item.price }}</td>
          </tr>
        </tbody>
      </table>

      <div class="total">
        <h3>Total: ${{ totalAmount }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { Document, Packer, Paragraph, Table, TableRow, TableCell, WidthType } from "docx";
import { saveAs } from "file-saver";

export default {
  data() {
    return {
      invoiceItems: [
        { name: "Item 1", quantity: 2, price: 10 },
        { name: "Item 2", quantity: 1, price: 20 },
        { name: "Item 3", quantity: 3, price: 15 },
      ],
    };
  },
  computed: {
    totalAmount() {
      return this.invoiceItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
    },
  },
  methods: {
    async downloadDOCX() {
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              new Paragraph("Invoice"),
              new Paragraph(`Invoice No: #INV-12345`),
              new Paragraph(`Date: ${new Date().toLocaleDateString()}`),
              new Table({
                width: { size: 100, type: WidthType.PERCENTAGE },
                rows: [
                  new TableRow({
                    children: [
                      new TableCell({ children: [new Paragraph("Item")] }),
                      new TableCell({ children: [new Paragraph("Quantity")] }),
                      new TableCell({ children: [new Paragraph("Price")] }),
                      new TableCell({ children: [new Paragraph("Total")] }),
                    ],
                  }),
                  ...this.invoiceItems.map(
                    (item) =>
                      new TableRow({
                        children: [
                          new TableCell({ children: [new Paragraph(item.name)] }),
                          new TableCell({ children: [new Paragraph(item.quantity.toString())] }),
                          new TableCell({ children: [new Paragraph(`$${item.price}`)] }),
                          new TableCell({ children: [new Paragraph(`$${item.quantity * item.price}`)] }),
                        ],
                      })
                  ),
                  new TableRow({
                    children: [
                      new TableCell({ children: [new Paragraph("Total")], columnSpan: 3 }),
                      new TableCell({ children: [new Paragraph(`$${this.totalAmount}`)] }),
                    ],
                  }),
                ],
              }),
            ],
          },
        ],
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, "invoice.docx");
    },
  },
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #f3f3f3;
  padding: 20px;
}

.download-btn {
  margin-bottom: 20px;
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.invoice {
  width: 100%;
  max-width: 600px;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th, td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

th {
  background: #f3f3f3;
}

.total {
  text-align: right;
  margin-top: 10px;
}
</style>
