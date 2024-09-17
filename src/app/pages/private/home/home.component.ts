import { Component, inject, OnInit } from '@angular/core'
import { StateService } from '../../../shared/state/services/state.service'
import { ApiService } from '../../../core/services/api.service'
import { DepartmentModel } from '../../../shared/state/models/department.interface'

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [],
    templateUrl: './home.component.html',
})
export class HomeComponent extends ApiService<DepartmentModel> implements OnInit {
    stateService = inject(StateService)
    protected override pathName = 'departments'
    logout() {
        this.stateService.logout()
    }

    ngOnInit(): void {
        //this.getPaginatedList('departments').subscribe((response) => console.log(response.data))
        this.getById(1).subscribe((response) => console.log(response))
    }

    updateRecord() {
        const data: DepartmentModel = {
            departmentId: 6,
            enabled: true,
            name: 'Club',
        }

        this.update(data).subscribe((response) => console.log(response))
    }

    createRecord() {
        const data: DepartmentModel = {
            departmentId: null,
            enabled: true,
            name: 'Test2',
        }

        this.create(data).subscribe((response) => console.log(response))
    }
}
