import json


def main():
    def add_class(_dict, _class, year, prereq):
        inner_dict = {}
        inner_dict['prereq'] = prereq
        inner_dict['year'] = str(year)

        _dict[_class] = inner_dict

    def add_fixed_pos(_dict, _class, x, y):
        inner_dict = _dict[_class]
        if x != -1:
            inner_dict['xPos'] = str(x)
        if y != -1:
            inner_dict['yPos'] = str(y)

    z = {}

    add_class(z, 'COS 125', 1, [])
    add_class(z, 'COS 140', 1, [])
    add_class(z, 'COS 135', 2, ['COS 140', 'COS 125'])
    add_class(z, 'COS 225', 2, ['COS 125'])
    add_class(z, 'COS 226', 3, ['COS 225'])
    add_class(z, 'COS 250', 3, [])
    add_class(z, 'COS 235', 4, ['COS 135'])
    add_class(z, 'COS 350', 4, ['COS 226', 'COS 250'])
    add_class(z, 'COS 301', 5, ['COS 226', 'COS 250'])
    add_class(z, 'COS 331', 5, ['COS 226', 'COS 235'])
    add_class(z, 'COS 420', 6, ['COS 331'])
    add_class(z, 'COS 430', 6, ['COS 235', 'COS 331'])
    add_class(z, 'COS 397', 7, ['COS 420'])
    add_class(z, 'COS 490', 7, ['COS 331'])
    add_class(z, 'COS 497', 8, ['COS 397'])
    add_class(z, 'COS 451', 8, ['COS 350'])

    add_fixed_pos(z, 'COS 125', -1, 0)
    add_fixed_pos(z, 'COS 225', -1, 0)
    add_fixed_pos(z, 'COS 226', -1, 0)
    add_fixed_pos(z, 'COS 350', -1, 0)
    add_fixed_pos(z, 'COS 451', -1, 0)
    add_fixed_pos(z, 'COS 490', -1, 0)



    with open('resources/class_data.json', 'w') as json_f:
        json.dump(z, json_f, indent=4)


if __name__ == "__main__":
    main()
