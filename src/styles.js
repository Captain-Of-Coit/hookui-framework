export const getGameClass = (...args) => {
    return args.map(key => styles[key]).join(' ');
}

// $Panel
export const CLASS_PANEL = 'panel_YqS'
export const CLASS_HEADER = 'header_H_U header_Bpo'
export const CLASS_CHILDOPACITYTRANSITION = 'child-opacity-transition_nkS'
export const CLASS_TITLEBAR = 'title-bar_PF4'
export const CLASS_ICONSPACE = 'icon-space_h_f'
export const CLASS_TITLE = 'title_SVH title_zQN'
export const CLASS_CONTENT = 'content_XD5 content_AD7'

// $Field
export const CLASS_FIELD = 'field_amr field_cjf'
export const CLASS_TOGGLEITEM = 'toggle-item_uwk'
export const CLASS_LABEL = 'label_VSW label_T__'
export const CLASS_TOGGLE = 'toggle_cca toggle_ATa'
export const CLASS_ITEMMOUSESTATES = 'item-mouse-states_Fmi'
export const CLASS_UNCHECKED = 'unchecked'
export const CLASS_CHECKED = 'checked'
export const CLASS_CHECKMARK = 'checkmark_NXV'

export const many = (...styles) => {
    return styles.join(' ')
}