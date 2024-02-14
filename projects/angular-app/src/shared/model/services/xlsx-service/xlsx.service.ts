import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class XlsxService {
    exportToXlsx(fileName: string): void {
        import('xlsx').then((xlsx) => {
            const workbook = xlsx.utils.book_new();
            const worksheet = xlsx.utils.aoa_to_sheet([
                ['A1', 'B1', 'C1'],
                ['A2', 'B2', 'C2'],
                ['A3', 'B3', 'C3'],
            ]);

            xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

            xlsx.writeFileXLSX(workbook, fileName)
        });
    }
}
