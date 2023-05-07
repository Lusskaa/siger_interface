import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import moment from 'moment'


function plansPDF(plans, filters) {
    
    pdfMake.vfs = pdfFonts.pdfMake.vfs

    const reportTitle = [
        {
          text: filters.start ? (
            `Relatório de testes de controle de Qualidade. Período: ${moment(filters.start, 'YYYY-MM-DD').format('DD/MM/YYYY')} até ${moment(filters.end, 'YYYY-MM-DD').format('DD/MM/YYYY')}`
            ):(
                `Relatório de testes de controle de Qualidade. Período Geral`
                ),
            
          fontSize: 15,
          bold: true,
          margin: [30, 30, 0, 45]  
        }
    ]


    const dados = plans.map((plan)=> {
        return [
            {text: moment(plan.date, 'YYYY-MM-DD').format('DD/MM/YYYY'), style: 'tableHeader', fontSize:9 },
            {text: plan.status ? (
                moment(plan.updatedAt, 'YYYY-MM-DD').format('DD/MM/YYYY')
              ) : (
                '---'
              ), 
            
            
            style: 'tableHeader', fontSize:9 },
            {text: plan.users.name, style: 'tableHeader', fontSize:9 },
            {text: plan.tests.name, style: 'tableHeader', fontSize:9 },
            {text: plan.tests.type , style: 'tableHeader', fontSize:9 },
            {text: plan.machines.name, style: 'tableHeader', fontSize:9 },
            {text: plan.situation, style: 'tableHeader', fontSize:9 },
            {text: plan.results, style: 'tableHeader', fontSize:9 },
            
        ]
    })


    const details = [
        {
            table: {
                headerRows: 1,
                widthis: ['*', '*', '*', '*', '*', '*'],
                body: [
                    [
                        {text: 'Data Prevista', style: 'tableHeader', fontSize: 10 },
                        {text: 'Realizado em', style: 'tableHeader', fontSize: 10 },
                        {text: 'Responsável', style: 'tableHeader', fontSize: 10 },
                        {text: 'Teste', style: 'tableHeader', fontSize: 10 },
                        {text: 'Tipo', style: 'tableHeader', fontSize: 10 },
                        {text: 'Máquina', style: 'tableHeader', fontSize: 10 },
                        {text: 'Resultado', style: 'tableHeader', fontSize: 10 },
                        {text: 'Observações', style: 'tableHeader', fontSize: 10 },
                        
                
                    ],
                    ...dados
                ]
            },
            layout:  'lightHorizontalLines'
        }
    ]
    
        function Rodape(currentPage, pageCount) {
        return [
            {
                text: `Acesso em ${moment().format('DD/MM/YYYY')}         Página ${currentPage} de ${pageCount}`,
                alignment: 'right',
                fontSize: 9,
                margin: [0, 10, 20, 0]  
              },
        ]
         }

    const docDefinitions = {
        pageSize: 'A4',
        pageMargins: [30, 50, 15, 40],

        header: [reportTitle],
        content: [details],
        footer: Rodape
    }


    pdfMake.createPdf(docDefinitions).download()





}

export default plansPDF