import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterdata'
})
export class FilterdataPipe implements PipeTransform {

  transform(items: any[], searchTerm: string, selectedField: string): any[] {

    if (!items || (!searchTerm && !selectedField)) {
      return items;
    }


    searchTerm = searchTerm ? searchTerm.toLowerCase() : '';

    return items.filter((item: any) => {
      // Customize the conditions based on your data structure
      return (
        (selectedField === 'Name' && item.name.toLowerCase().includes(searchTerm)) ||
        (selectedField === 'Email' && item.email.toLowerCase().includes(searchTerm)) ||
        (selectedField === 'Phone Number' && item.pnumber.toString().includes(searchTerm)) ||
        (selectedField === 'Age' && item.age.toString().includes(searchTerm)) ||
        (selectedField === 'Body Height' && item.bheight.toString().includes(searchTerm)) ||
        (selectedField === 'Body Weight' && item.bweight.toString().includes(searchTerm)) ||
        (selectedField === 'Gender' && item.gender.toLowerCase().includes(searchTerm)) ||
        (selectedField === 'Address' && item.address.toLowerCase().includes(searchTerm))
      );
    });
  }
}
