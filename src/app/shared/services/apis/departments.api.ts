import { Injectable } from '@angular/core'
import { ApiClass } from '../../../core/models/classes/api.class'
import { DepartmentModel } from '../../models/interfaces/department.interface'

@Injectable({
    providedIn: 'root',
})
export class DepartmentsApiService extends ApiClass<DepartmentModel> {
    protected override pathName = 'departments'
}
