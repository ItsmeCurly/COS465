import pandas
import os.path as path
import os
import json

from adam_final.class_json import main as json_init

DATA_DIRECTORY = 'data'

CLASSES = ['COS 125',
           'COS 140',
           'COS 135',
           'COS 225',
           'COS 226',
           'COS 250',
           'COS 235',
           'COS 350',
           'COS 301',
           'COS 331',
           'COS 420',
           'COS 430',
           'COS 397',
           'COS 490',
           'COS 497',
           'COS 451']

def main():
    if not path.exists(f"reformatted_data"):
        os.mkdir("reformatted_data")

    json_init()

    # read in data
    df = pandas.read_csv("data/course_grades.csv")

    df = df.groupby(['Course ID', "Course"]).count().reset_index()
    df = df.drop_duplicates()

    with open('resources/class_data.json') as f:
            class_data = json.load(f)

    df = df.loc[df['Course'].isin(class_data.keys())].set_index('Course ID')

    df = df.rename(columns = {"Course ID": "CourseID", "StudentID": "TotalStudents"})

    #df.to_csv(f"{DATA_DIRECTORY}/combined_terms_classes.csv")

    nodes = []
    links = []

    for i in class_data:
        d = {}
        d['name'] = i
        d['year'] = str(int(class_data[i]['year']) - 1)

        _val_in = get_class_value(df, i)
        if _val_in == 0:
            _val_in = 1
        d["value_in"] = _val_in

        nodes.append(d)

    print(nodes)

    for i in class_data:
        for j in class_data[i]['prereq']:
            d = {}

            d["source"] = j
            d["target"] = i

            _val = get_class_value(df, i)
            if _val == 0:
                _val = 1
            d["value"] = _val

            links.append(d)

    output = {}

    output['nodes'] = nodes
    output['links'] = links

    with open('data/classes.json', 'w') as json_f:
        json.dump(output, json_f, indent=4, sort_keys=True)

def get_class_value(df, class_name):
    try:
        d = df.loc[df['Course'] == class_name].values[0][1]
    except:
        d = 0
    return d

if __name__ == "__main__":
    main()


