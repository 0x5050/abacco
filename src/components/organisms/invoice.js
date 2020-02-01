import Logo from '@/assets/logo.png'
import {DateTime} from 'luxon'

const prepareInvoice = (invoice) => {
  const PDFInvoice = {
    content: [
      prepareHeader(invoice),
      prepareAdresses(invoice),
      prepareTable(invoice)
    ]
  }
  return PDFInvoice
}

const prepareTable = ({items, worth}) => {
  let result = [
    [
      {text: 'Lp.', style: 'tableHeader'},
      {text: 'Nazwa towaru/usługi', style: 'tableHeader'},
      {text: 'Cena netto', style: 'tableHeader'},
      {text: 'Ilość', style: 'tableHeader'},
      {text: 'VAT (%)', style: 'tableHeader'},
      {text: 'Cena razem', style: 'tableHeader'}
    ]
  ]
  let nettoSum = 0
  let bruttoSum = 0
  let lp = 0
  items.forEach(item => {
    lp++
    const _bruttoPrice = (item.price * (1 + (item.vat_rate / 100))) * item.count
    result.push([
      lp,
      item.name,
      item.price,
      item.count,
      item.vat_rate,
      _bruttoPrice
    ])
    nettoSum += Number(item.price) * item.count
    bruttoSum += (_bruttoPrice * item.vat_rate) / (100 + item.vat_rate)
  })
  console.log(bruttoSum)
  return [
    {
      text: 'POZYCJE FAKTURY',
      margin: [0, 20, 0, 5],
      fontSize: 15
    },
    {
      layout: {
        fillColor: (rowIndex, node, columnIndex) => {
          return (rowIndex % 2 === 0) ? '#f2f2f2' : null
        },
        hLineWidth: (i, node) => {
          if (i === 0 || i === node.table.body.length) {
            return 0
          }
          return (i === node.table.headerRows) ? 2 : 1
        },
        vLineWidth: (i) => {
          return 0
        },
        hLineColor: (i) => {
          return i === 1 ? '#a0a7b0' : '#788494'
        },
        paddingLeft: (i) => {
          return i === 0 ? 0 : 8
        },
        paddingRight: (i, node) => {
          return (i === node.table.widths.length - 1) ? 0 : 8
        }
      },
      table: {
        headerRows: 1,
        widths: [ 'auto', '*', 'auto', 'auto', 'auto', 'auto' ],
        body: result
      }
    },
    {
      text: '\n\n'
    },
    {
      table: {
        headerRows: 1,
        widths: ['*', 'auto'],
        body: [
          [
            {
              text: 'Suma netto',
              border: [false, true, false, true],
              alignment: 'right',
              margin: [0, 5, 0, 5]
            },
            {
              border: [false, true, false, true],
              text: nettoSum.toFixed(2),
              alignment: 'right',
              fillColor: '#f5f5f5',
              margin: [0, 5, 0, 5]
            }
          ],
          [
            {
              text: 'Suma VAT',
              border: [false, false, false, true],
              alignment: 'right',
              margin: [0, 5, 0, 5]
            },
            {
              text: bruttoSum.toFixed(2),
              border: [false, false, false, true],
              fillColor: '#f5f5f5',
              alignment: 'right',
              margin: [0, 5, 0, 5]
            }
          ],
          [
            {
              text: 'Suma brutto',
              bold: true,
              fontSize: 20,
              alignment: 'right',
              border: [false, false, false, true],
              margin: [0, 5, 0, 5]
            },
            {
              text: worth.toFixed(2),
              bold: true,
              fontSize: 20,
              alignment: 'right',
              border: [false, false, false, true],
              fillColor: '#f5f5f5',
              margin: [0, 5, 0, 5]
            }
          ]
        ]
      }
    }
  ]
}

const prepareAdresses = ({recipient, sender}) => {
  return [{
    columns: [
      {
        text: 'Sprzedawca',
        color: '#aaaaab',
        bold: true,
        fontSize: 14,
        alignment: 'left',
        margin: [0, 20, 0, 5]
      },
      {
        text: 'Nabywca',
        color: '#aaaaab',
        bold: true,
        fontSize: 14,
        alignment: 'left',
        margin: [0, 20, 0, 5]
      }
    ]
  },
  {
    columns: [
      {
        text: `${sender.name}\nNIP: ${sender.nip}`,
        bold: true,
        color: '#333333',
        alignment: 'left'
      },
      {
        text: `${recipient.name}\nNIP: ${recipient.nip}`,
        bold: true,
        color: '#333333',
        alignment: 'left'
      }
    ]
  },
  {
    columns: [
      {
        text: 'Adres',
        color: '#aaaaab',
        bold: true,
        margin: [0, 7, 0, 3]
      },
      {
        text: 'Adres',
        color: '#aaaaab',
        bold: true,
        margin: [0, 7, 0, 3]
      }
    ]
  },
  {
    columns: [
      {
        text: `${sender.street}\nNIP: ${sender.zip} ${sender.city}`,
        style: 'invoiceBillingAddress'
      },
      {
        text: `${recipient.street}\nNIP: ${recipient.zip} ${recipient.city}`,
        style: 'invoiceBillingAddress'
      }
    ]
  }]
}
const prepareHeader = ({number, date}) => {
  date = DateTime.fromISO(date).toFormat('D')
  return {
    columns: [
      {
        image: Logo,
        width: 100
      },
      [
        {
          text: 'Faktura VAT',
          color: '#333333',
          width: '*',
          fontSize: 28,
          bold: true,
          alignment: 'right',
          margin: [0, 0, 0, 15]
        },
        {
          stack: [
            {
              columns: [
                {
                  text: 'Numer faktury',
                  color: '#aaaaab',
                  bold: true,
                  width: '*',
                  fontSize: 12,
                  alignment: 'right',
                  margin: [0, 5, 0, 2]

                },
                {
                  text: number,
                  bold: true,
                  color: '#333333',
                  fontSize: 12,
                  alignment: 'right',
                  width: 100,
                  margin: [0, 5, 0, 2]
                }
              ]
            },
            {
              columns: [
                {
                  text: 'Data sprzedaży',
                  color: '#aaaaab',
                  bold: true,
                  width: '*',
                  fontSize: 12,
                  alignment: 'right',
                  margin: [0, 5, 0, 2]
                },
                {
                  text: date,
                  bold: true,
                  color: '#333333',
                  fontSize: 12,
                  alignment: 'right',
                  width: 100,
                  margin: [0, 5, 0, 2]
                }
              ]
            },
            {
              columns: [
                {
                  text: 'Sposób zapłaty',
                  color: '#aaaaab',
                  bold: true,
                  fontSize: 12,
                  alignment: 'right',
                  width: '*',
                  margin: [0, 5, 0, 2]
                },
                {
                  text: 'Przelew',
                  bold: true,
                  fontSize: 12,
                  alignment: 'right',
                  width: 100,
                  margin: [0, 5, 0, 2]
                }
              ]
            },
            {
              columns: [
                {
                  text: 'Termin płatności',
                  color: '#aaaaab',
                  bold: true,
                  fontSize: 12,
                  alignment: 'right',
                  width: '*',
                  margin: [0, 5, 0, 2]

                },
                {
                  text: date,
                  bold: true,
                  fontSize: 12,
                  alignment: 'right',
                  width: 100,
                  margin: [0, 5, 0, 2]
                }
              ]
            }
          ]
        }
      ]
    ]
  }
}

/*
const docDefinition = {
  content: [
    {
      columns: [
        {
          image: Logo,
          width: 100
        },
        [
          {
            text: 'Faktura VAT',
            color: '#333333',
            width: '*',
            fontSize: 28,
            bold: true,
            alignment: 'right',
            margin: [0, 0, 0, 15]
          },
          {
            stack: [
              {
                columns: [
                  {
                    text: 'Numer faktury',
                    color: '#aaaaab',
                    bold: true,
                    width: '*',
                    fontSize: 12,
                    alignment: 'right',
                    margin: [0, 5, 0, 2]

                  },
                  {
                    text: invoice.number,
                    bold: true,
                    color: '#333333',
                    fontSize: 12,
                    alignment: 'right',
                    width: 100,
                    margin: [0, 5, 0, 2]
                  }
                ]
              },
              {
                columns: [
                  {
                    text: 'Data sprzedaży',
                    color: '#aaaaab',
                    bold: true,
                    width: '*',
                    fontSize: 12,
                    alignment: 'right',
                    margin: [0, 5, 0, 2]
                  },
                  {
                    text: '01.01.2020',
                    bold: true,
                    color: '#333333',
                    fontSize: 12,
                    alignment: 'right',
                    width: 100,
                    margin: [0, 5, 0, 2]
                  }
                ]
              },
              {
                columns: [
                  {
                    text: 'Sposób zapłaty',
                    color: '#aaaaab',
                    bold: true,
                    fontSize: 12,
                    alignment: 'right',
                    width: '*',
                    margin: [0, 5, 0, 2]
                  },
                  {
                    text: 'Przelew',
                    bold: true,
                    fontSize: 12,
                    alignment: 'right',
                    width: 100,
                    margin: [0, 5, 0, 2]
                  }
                ]
              },
              {
                columns: [
                  {
                    text: 'Termin płatności',
                    color: '#aaaaab',
                    bold: true,
                    fontSize: 12,
                    alignment: 'right',
                    width: '*',
                    margin: [0, 5, 0, 2]

                  },
                  {
                    text: '01.01.2020',
                    bold: true,
                    fontSize: 12,
                    alignment: 'right',
                    width: 100,
                    margin: [0, 5, 0, 2]
                  }
                ]
              }
            ]
          }
        ]
      ]
    },
//////////////////////////////////////////////
    {
      columns: [
        {
          text: 'Sprzedawca',
          color: '#aaaaab',
          bold: true,
          fontSize: 14,
          alignment: 'left',
          margin: [0, 20, 0, 5]
        },
        {
          text: 'Nabywca',
          color: '#aaaaab',
          bold: true,
          fontSize: 14,
          alignment: 'left',
          margin: [0, 20, 0, 5]
        }
      ]
    },
    {
      columns: [
        {
          text: 'PPHU Abacco\nNIP: 12345-123-123-23-23',
          bold: true,
          color: '#333333',
          alignment: 'left'
        },
        {
          text: 'Ikea SP. Z O.O.\n NIP: 12345-123-123-43-55',
          bold: true,
          color: '#333333',
          alignment: 'left'
        }
      ]
    },
    {
      columns: [
        {
          text: 'Adres',
          color: '#aaaaab',
          bold: true,
          margin: [0, 7, 0, 3]
        },
        {
          text: 'Adres',
          color: '#aaaaab',
          bold: true,
          margin: [0, 7, 0, 3]
        }
      ]
    },
    {
      columns: [
        {
          text: 'Aleja Grunwaldzka 286 d \n80-288 Gdańsk',
          style: 'invoiceBillingAddress'
        },
        {
          text: 'Złota karczma 23 \n 80-266 Gdańsk',
          style: 'invoiceBillingAddress'
        }
      ]
    },
    '\n\n',
//////////////////////////////////////////
    {
      text: 'POZYCJE FAKTURY',
      margin: [0, 20, 0, 5],
      fontSize: 15
    },
    {
      layout: {
        fillColor: (rowIndex, node, columnIndex) => {
          return (rowIndex % 2 === 0) ? '#f2f2f2' : null
        },
        hLineWidth: (i, node) => {
          if (i === 0 || i === node.table.body.length) {
            return 0
          }
          return (i === node.table.headerRows) ? 2 : 1
        },
        vLineWidth: (i) => {
          return 0
        },
        hLineColor: (i) => {
          return i === 1 ? '#a0a7b0' : '#788494'
        },
        paddingLeft: (i) => {
          return i === 0 ? 0 : 8
        },
        paddingRight: (i, node) => {
          return (i === node.table.widths.length - 1) ? 0 : 8
        }
      },
      table: {
        headerRows: 1,
        widths: [ 'auto', '*', 'auto', 'auto', 'auto', 'auto' ],
        body: [
          [
            {text: 'Lp.', style: 'tableHeader'},
            {text: 'Nazwa towaru/usługi', style: 'tableHeader'},
            {text: 'Cena netto', style: 'tableHeader'},
            {text: 'Ilość', style: 'tableHeader'},
            {text: 'VAT (%)', style: 'tableHeader'},
            {text: 'Cena razem', style: 'tableHeader'}
          ],
          [ '1', 'Tynkowanie', '200', '1', '23', '200' ],
          [ '1', 'Tynkowanie', '200', '1', '23', '200' ],
          [ '', '', '', '', 'Suma:', '400' ]

        ]
      }
    },
    {
      text: '\n\n'
    },
    {
      table: {
        headerRows: 1,
        widths: ['*', 'auto'],
        body: [
          [
            {
              text: 'Suma netto',
              border: [false, true, false, true],
              alignment: 'right',
              margin: [0, 5, 0, 5]
            },
            {
              border: [false, true, false, true],
              text: '999.99 zł',
              alignment: 'right',
              fillColor: '#f5f5f5',
              margin: [0, 5, 0, 5]
            }
          ],
          [
            {
              text: 'Suma VAT',
              border: [false, false, false, true],
              alignment: 'right',
              margin: [0, 5, 0, 5]
            },
            {
              text: '999.99 zł',
              border: [false, false, false, true],
              fillColor: '#f5f5f5',
              alignment: 'right',
              margin: [0, 5, 0, 5]
            }
          ],
          [
            {
              text: 'Suma brutto',
              bold: true,
              fontSize: 20,
              alignment: 'right',
              border: [false, false, false, true],
              margin: [0, 5, 0, 5]
            },
            {
              text: 'PLN 999.99',
              bold: true,
              fontSize: 20,
              alignment: 'right',
              border: [false, false, false, true],
              fillColor: '#f5f5f5',
              margin: [0, 5, 0, 5]
            }
          ]
        ]
      }
    }
  ],
  styles: {
    tableHeader: {
      fontSize: 15,
      bold: true,
      margin: [2, 0, 0, 0]
    },
    cell: {
      margin: [2, 0, 0, 0]
    }
  }
}
*/
export {prepareInvoice}
