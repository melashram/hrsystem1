import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Employee } from './employee.model';
import { EmployeeService } from './employee.service';

@Injectable()
export class EmployeePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private employeeService: EmployeeService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.employeeService.find(id)
                    .subscribe((employeeResponse: HttpResponse<Employee>) => {
                        const employee: Employee = employeeResponse.body;
                        if (employee.dOB) {
                            employee.dOB = {
                                year: employee.dOB.getFullYear(),
                                month: employee.dOB.getMonth() + 1,
                                day: employee.dOB.getDate()
                            };
                        }
                        if (employee.hireDate) {
                            employee.hireDate = {
                                year: employee.hireDate.getFullYear(),
                                month: employee.hireDate.getMonth() + 1,
                                day: employee.hireDate.getDate()
                            };
                        }
                        this.ngbModalRef = this.employeeModalRef(component, employee);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.employeeModalRef(component, new Employee());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    employeeModalRef(component: Component, employee: Employee): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.employee = employee;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
