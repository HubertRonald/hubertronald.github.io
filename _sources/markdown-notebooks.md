---
jupytext:
  formats: md:myst
  text_representation:
    extension: .md
    format_name: myst
    format_version: 0.13
    jupytext_version: 1.11.5
kernelspec:
  display_name: Python 3
  language: python
  name: python3
---

# Documentar el modelado 

Ahora, elaboren un documento escrito en español con las siguientes secciones: 

1. Variables en base de datos original. Tengan en cuenta que, al describir esta base de datos, los nombres de las variables deben estar escritas en inglés, tal cual las encuentran en la base de datos original, mientras que las descripciones sí deben estar escritas en español. Esto permite a los otros miembros del grupo volver a la base original y reconocer las variables que están describiendo: 

- Tipo de variable (número, texto, etc.). 
- Descripción de variable.  

2. Variables luego de modeladas. Durante el modelado, ustedes pueden cambiar el nombre de las variables, las pueden dejar en inglés o traducirlas al español. En cualquier caso, por buena práctica, decidan qué idioma van a usar y sean consistentes con esa decisión en todas las variables: 

- Tipo de variable. 
- Descripción corta, máximo 1 párrafo. 

3. Describir paso a paso lo que una persona debería hacer para actualizar los datos y aplicar el modelado que han diseñado. Piensen esta sección como una ayuda a alguien que los va a reemplazar en el trabajo. Esta persona debe entender con precisión cómo replicar lo que diseñaron. Este paso a paso asume que la estructura de la base de datos original no cambia en nuevas versiones. Puede ser tan detallada como ustedes quieran, pero debe ser muy claro cómo crear los nuevos campos y procedimientos para limpiar.

```{admonition} ETL
Todo el proceso se encuenta embebido en el presente sitio web, mayor detalle en [ETL](etl)
```

(variables-originales)=
## Variables en base de datos original

Primero se efectua un print de las columnas que trae el juego de datos

```{code-cell} ipython3
:tags: ["hide-input"]

import pandas as pd
pd.set_option('display.max_rows', 200)
pd.set_option('display.max_columns', None)
pd.set_option('display.width', None)
pd.set_option('max_colwidth', None)
pd.set_option('display.float_format', lambda x: f'{x:.2f}' )

path:str = './data'
file_name: str = 'Ask A Manager Salary Survey 2021 (Responses) - Form Responses 1.csv'
df = pd.read_csv(f'{path}/{file_name}')
cols = df.columns.tolist()

print('Columnas que trae el dataframe')
print('')
for idx, col in enumerate(cols):
  print(f'{idx:02d} {col}')
```


```{hint} A las cabeceras originales (variables)
se le coloca los números correlativos por que los nombres originales son extensas, ver el [inicio de este documento](variables-originales) para saber como se llaman
```

A continuación se muestran los tipos para cada columna 

```{code-cell} ipython3
:tags: ["hide-input"]
print('Tipo de dato por Columnas')
print('')

df.columns = [ f'{i:02d}' for i in range(len(df.columns))]
#for idx, dtype in enumerate(df.dtypes):
#  print(f'{idx:02d} {"String" if "object"==dtype else "Numeric"}')
print(df.info())
```

En relación a lo anterior se da una muestra de los datos porque la herramienta reconoce a todos como texto

```{code-cell} ipython3
:tags: ["hide-input"]
df.head(5)
```

En aras de no caer en la repetición con la descripción (porque los datos limpios ya las tienen) se deja esta parte para el siguiente punto. Tengase en cuenta el [ETL](etl) para más detalle.

Lo único que se puede indicar que las siguientes columnas se eliminan porque la cantidad de no nulos es muchísimo menor al total de observaciones 28006

- `04 If your job title needs additional context, please clarify here:` Solo tiene 7245 observaciones
- `08 If "Other," please indicate the currency here:` Solo tiene 199 observaciones
- `09 If your income needs additional context, please provide it here:` Solo tiene 3036 observaciones


## Variables luego de modeladas

Se genera el archivo que se subirá a Looker Studio para ello se comparte su estructura luego de efectuado el [ETL](etl).

```{code-cell} ipython3
:tags: ["hide-input"]
df_clean = pd.read_csv(f'./industry_salary_output_clean.csv')

print(df_clean.info())
```

A continación se muestra el conjunto de datos para luego dar una descripción y el tipo de cada una de sus columnas (características)

```{code-cell} ipython3
:tags: ["hide-input"]
df_clean.head(5)
```

Se proporciona la discripción así como los tipos de cada variable (columna)

```{code-cell} ipython3
:tags: ["hide-input"]
df_descripcion = pd.DataFrame({
  'variable': df_clean.columns.tolist(),
  'tipoVariable': ['timestamp', 'string', 'string', 'string', 'float', 'float'
  , 'string', 'string', 'string'
  , 'string', 'string', 'string'
  , 'string', 'string', 'string'
  , 'float'
  ],
  'descripcion': [
    'fecha con hora',
    'rango de edades',
    'industria en la que trabaja',
    'titulo del puesto de trabajo',
    'salario anual',
    'compensacion anual',
    'moneda',
    'pais',
    'estados solo de estados unidos',
    'ciudad',
    'anios de experiencia general',
    'anios de experiencia especifica',
    'educacion',
    'genero',
    'etnia',
    'tipo de cambio a 2024-02-10 de https://www.xe.com/es/currencyconverter/'
  ]
})

df_descripcion.head(20)
```



## Paso a Paso actualizar datos

Como todo el detalle del proceso está en el [ETL](etl), hay que tener en cuenta lo siguiente porque dicho script no está automatizado para ingestar directamente las fuentes, por lo demás, eso va a procesar y generar el archivo que Looker Studio consume actualmente:

1. Cargar la fuente https://docs.google.com/spreadsheets/d/1IPS5dBSGtwYVbjsfbaMCYIWnOuRmJcbequohNxCyGVw/edit?resourcekey#gid=1625408792  

2. Actualizar las divisas de https://www.xe.com/es/currencyconverter/ el cual posee un api (aunque es de pago) para su consumo directo ya sea con python o con bash
![](https://images.ctfassets.net/izij9rskv5y1/5z5ZPZmIsy6KpExpI6kR4s/ff05a2986b702e6a937e1ea687ddfd78/xe-currency-data-api-documentation.png)

3. La estandarización de las `industrias` es algo que se puede aún mejorar más, por favor ver las notas colocadas al módulo 3 en el [Tablero](tablero)

4. Adicional a los pasos anterior está subir el archivo `industry_salary_output_clean.csv` que genera el [ETL](etl) al looker studio para que la información quede actualizada


## Sobre el Sitio Web

Con respecto a la rúbrica para conseguir el puntaje extra, emplee `jupyter book` para crear el presente entregable mediante un pequeño `.devcontainer` y hosteando el sitio en mi cuenta de `github`.
