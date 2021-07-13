import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-list-navigator',
    templateUrl: './list-navigator.component.html',
    styleUrls: ['./list-navigator.component.css']
})
export class ListNavigatorComponent implements OnInit {

    @Input() amountOnPage: number = 1;
    @Input() totalAmount: number = 0;
    @Input() pageShortcutsAmount: number = 3;

    @Output() onChanged = new EventEmitter();

    pageAmount: number = 0;
    currentPageIndex: number = 0;
    pagesShortcuts: number[] = [];

    constructor() {
    }

    ngOnInit(): void {
    }

    ngOnChanges() {
        this.pageAmount = Math.ceil(this.totalAmount / this.amountOnPage);
        this.pagesShortcuts = Array(Math.min(this.pageShortcutsAmount, this.pageAmount));

        // Correcting currentPageIndex if it bigger than whole page amount
        this.setCurrentPageIndex(Math.min(this.currentPageIndex, this.pageAmount - 1));
    }

    setCurrentPageIndex(newValue: number): void {
        // Validation
        if (newValue < 0 || newValue >= this.pageAmount) return;
        // Setting
        this.currentPageIndex = newValue;
        this.recalculateShortcuts();
        // Notify listeners
        this.onChanged.emit(newValue);
    }

    private recalculateShortcuts() {
        // Find index of page shortcut to be marked as selected
        // If amount of shortcuts is odd then take a shortcut in the middle
        // If amount of shortcuts is even then take a shortcut left of the middle
        let selectedPageShortcutIndex = Math.floor(this.pagesShortcuts.length / 2 - 0.1);
        selectedPageShortcutIndex = Math.min(selectedPageShortcutIndex, this.currentPageIndex);
        if (this.pagesShortcuts.length - selectedPageShortcutIndex > this.pageAmount - this.currentPageIndex) {
            selectedPageShortcutIndex = this.pagesShortcuts.length - (this.pageAmount - this.currentPageIndex);
        }
        // Fill shortcuts array depending on selected shortcut
        for (let i = 0; i < this.pagesShortcuts.length; i++) {
            this.pagesShortcuts[i] = this.currentPageIndex + (i - selectedPageShortcutIndex) + 1;
        }
    }
}
