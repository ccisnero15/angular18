import { Component, inject, OnInit } from '@angular/core'
import { StateService } from '../../../shared/state/services/state.service'
import { DepartmentModel } from '../../../shared/models/interfaces/department.interface'
import { DepartmentsApiService } from '../../../shared/services/apis/departments.api'

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [],
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
    stateService = inject(StateService)
    departmentsApiService = inject(DepartmentsApiService)

    logout() {
        this.stateService.logout()
    }

    ngOnInit(): void {
        this.departmentsApiService.getById(1).subscribe((response) => console.log(response))
    }

    updateRecord() {
        const data: DepartmentModel = {
            departmentId: 6,
            enabled: true,
            name: 'Club',
        }

        this.departmentsApiService.update(data).subscribe((response) => console.log(response))
    }

    createRecord() {
        const data: DepartmentModel = {
            departmentId: null,
            enabled: true,
            name: 'Test2',
        }

        this.departmentsApiService.create(data).subscribe((response) => console.log(response))
    }
}
