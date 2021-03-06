/*****************************************************************************************
 * X2Engine Open Source Edition is a customer relationship management program developed by
 * X2Engine, Inc. Copyright (C) 2011-2015 X2Engine Inc.
 * 
 * This program is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License version 3 as published by the
 * Free Software Foundation with the addition of the following permission added
 * to Section 15 as permitted in Section 7(a): FOR ANY PART OF THE COVERED WORK
 * IN WHICH THE COPYRIGHT IS OWNED BY X2ENGINE, X2ENGINE DISCLAIMS THE WARRANTY
 * OF NON INFRINGEMENT OF THIRD PARTY RIGHTS.
 * 
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more
 * details.
 * 
 * You should have received a copy of the GNU Affero General Public License along with
 * this program; if not, see http://www.gnu.org/licenses or write to the Free
 * Software Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA
 * 02110-1301 USA.
 * 
 * You can contact X2Engine, Inc. P.O. Box 66752, Scotts Valley,
 * California 95067, USA. or at email address contact@x2engine.com.
 * 
 * The interactive user interfaces in modified source and object code versions
 * of this program must display Appropriate Legal Notices, as required under
 * Section 5 of the GNU Affero General Public License version 3.
 * 
 * In accordance with Section 7(b) of the GNU Affero General Public License version 3,
 * these Appropriate Legal Notices must retain the display of the "Powered by
 * X2Engine" logo. If the display of the logo is not reasonably feasible for
 * technical reasons, the Appropriate Legal Notices must display the words
 * "Powered by X2Engine".
 *****************************************************************************************/

$.widget("x2.InlineRelationshipsGridView", $.x2.gvSettings, {
    options: {
    },
    _create:function() {
        this._super ();
        this._setUpDetailViewCollapsibles ();
    },
    /**
     * Set up behavior of detail view toggles 
     */
    _setUpDetailViewCollapsibles: function () {
        var expand$ = this.element.find ('.detail-view-toggle .fa-caret-right');
        var collapse$ = this.element.find ('.detail-view-toggle .fa-caret-down');

        // expand section containing record detail view
        expand$.unbind ('click._setUpDetailViewCollapsibles').
            bind ('click._setUpDetailViewCollapsibles', function () {
            
                var row$ = $(this).closest ('tr');
                if (row$.next ().hasClass ('relationships-grid-details-container')) {
                    row$.next ().slideDown ();
                } else {
                    var detailsContainer$ = $('<tr>', { 
                        'class': 'relationships-grid-details-container' 
                    });
                    var detailsContainerInner$ = $('<td>', {
                        colspan: 7
                    });
                    detailsContainer$.append (detailsContainerInner$);
                    row$.after (detailsContainer$);

                    new x2.QuickRead ({ 
                        modelName: $(this).parent ().attr ('data-name'),
                        modelId: $(this).parent ().attr ('data-id'),
                        modelType: $(this).parent ().attr ('data-class'),
                        mode: 'custom',
                        afterRequest: function (response) {
                            detailsContainerInner$.append (response);
                        }
                    });
                }

                $(this).hide ();
                $(this).next ().show ();
            });
        collapse$.unbind ('click._setUpDetailViewCollapsibles').
            bind ('click._setUpDetailViewCollapsibles', function () {

                $(this).closest ('tr').next ().slideUp ();
                $(this).hide ();
                $(this).prev ().show ();
            });
    }
});

